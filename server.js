
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const crypto = require("crypto");

const troubleshootingData = require("./knowledge/troubleshooting");
const ticketStore = require("./tickets/ticketStore");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

// Server health check
app.get("/api/health", (req, res) => {
    res.json({
        status: "success",
        message: "OptxCare AI server is running!"
    });
});

// Normalize user input
function normalizeMessage(message) {
    return message
        .toLowerCase()
        .replace(/[^\w\s-]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

// Detect operating system
function detectOperatingSystem(message) {
    const text = normalizeMessage(message);

    if (/\b(linux|ubuntu|debian|fedora|centos)\b/.test(text)) {
        return "Linux";
    }

    if (/\b(windows|win11|win10)\b/.test(text)) {
        return "Windows";
    }

    return null;
}

// Detect device type
function detectDevice(message) {
    const text = normalizeMessage(message);

    if (/\b(laptop|notebook)\b/.test(text)) {
        return "Laptop";
    }

    if (/\b(desktop|pc)\b/.test(text)) {
        return "Desktop PC";
    }

    return null;
}

// Check whether a keyword matches
function matchesKeyword(message, keyword) {
    const normalizedMessage = normalizeMessage(message);
    const normalizedKeyword = normalizeMessage(keyword);

    if (normalizedMessage.includes(normalizedKeyword)) {
        return true;
    }

    const messageWords = normalizedMessage.split(" ");
    const keywordWords = normalizedKeyword.split(" ");

    return keywordWords.every(word =>
        messageWords.includes(word)
    );
}

// Customize issue title based on device
function getDeviceSpecificTitle(title, device) {
    if (!device) {
        return title;
    }

    if (title === "Slow Computer Performance") {
        return device === "Laptop"
            ? "Slow Laptop Performance"
            : "Slow Desktop PC Performance";
    }

    if (title === "Computer Startup Issue") {
        return device === "Laptop"
            ? "Laptop Startup Issue"
            : "Desktop PC Startup Issue";
    }

    return `${device} - ${title}`;
}

// Chat API
app.post("/api/chat", (req, res) => {
    const userMessage = req.body.message;

    if (
        !userMessage ||
        typeof userMessage !== "string" ||
        !userMessage.trim()
    ) {
        return res.status(400).json({
            title: "Invalid Message",
            reply: "Please describe your IT issue."
        });
    }

    const message = normalizeMessage(userMessage);
    const device = detectDevice(message);
    const operatingSystem = detectOperatingSystem(message);

    const matchingIssues = troubleshootingData.filter(issue =>
        issue.keywords.some(keyword =>
            matchesKeyword(message, keyword)
        )
    );

    let matchedIssue = null;

    // Linux-specific priority
    if (operatingSystem === "Linux") {
        matchedIssue = matchingIssues.find(issue =>
            issue.title.startsWith("Linux ")
        );
    }

    // Windows-specific priority
    if (operatingSystem === "Windows" && !matchedIssue) {
        matchedIssue = matchingIssues.find(issue =>
            issue.title.startsWith("Windows ")
        );
    }

    // General matching
    if (!matchedIssue) {
        matchedIssue = matchingIssues[0];
    }

    if (matchedIssue) {
        return res.json({
            title: getDeviceSpecificTitle(
                matchedIssue.title,
                device
            ),
            reply: matchedIssue.response
        });
    }

    // Improved unrecognized issue response
    return res.json({
        title: "Let's Understand Your IT Issue",
        reply: "I couldn't identify this issue from my current troubleshooting knowledge base. Please provide a few more details:\n\n1. Which device are you using (Laptop or Desktop PC)?\n2. Which operating system are you using (Windows or Linux)?\n3. What exactly happens when the issue occurs?\n4. Is there any error message displayed?\n\nPlease share these details so I can check whether a supported troubleshooting guide matches your issue. If the problem continues, you can submit an IT support ticket using the form below."
    });
});

// Create IT support ticket
app.post("/api/tickets", (req, res) => {
    const { name, issue } = req.body;

    if (
        typeof issue !== "string" ||
        !issue.trim()
    ) {
        return res.status(400).json({
            status: "error",
            message: "Please provide an issue description."
        });
    }

    if (
        name !== undefined &&
        (typeof name !== "string" || name.length > 100)
    ) {
        return res.status(400).json({
            status: "error",
            message: "Please provide a valid name."
        });
    }

    if (issue.trim().length > 2000) {
        return res.status(400).json({
            status: "error",
            message: "Issue description must be under 2000 characters."
        });
    }

    try {
        const ticket = {
            ticketId: "OPTX-" + crypto.randomBytes(4).toString("hex").toUpperCase(),
            name: typeof name === "string" ? name.trim() : "Not provided",
            issue: issue.trim(),
            status: "Open",
            createdAt: new Date().toISOString()
        };

        ticketStore.saveTicket(ticket);

        return res.status(201).json({
            status: "success",
            message: "Your IT support ticket has been created successfully!",
            ticket
        });

    } catch (error) {
        console.error("Ticket creation error:", error);

        return res.status(500).json({
            status: "error",
            message: "Unable to create your ticket. Please try again."
        });
    }
});

// Get all IT support tickets
app.get("/api/tickets", (req, res) => {
    try {
        const tickets = ticketStore.getTickets();

        return res.json({
            status: "success",
            totalTickets: tickets.length,
            tickets
        });

    } catch (error) {
        console.error("Ticket retrieval error:", error);

        return res.status(500).json({
            status: "error",
            message: "Unable to retrieve tickets."
        });
    }
});

// Update IT support ticket status
app.patch("/api/tickets/:ticketId/status", (req, res) => {
    const { ticketId } = req.params;
    const { status } = req.body;

    if (!["Open", "Resolved"].includes(status)) {
        return res.status(400).json({
            status: "error",
            message: "Status must be Open or Resolved."
        });
    }

    try {
        const updatedTicket = ticketStore.updateTicketStatus(
            ticketId,
            status
        );

        if (!updatedTicket) {
            return res.status(404).json({
                status: "error",
                message: "Ticket not found."
            });
        }

        return res.json({
            status: "success",
            message: "Ticket status updated successfully.",
            ticket: updatedTicket
        });

    } catch (error) {
        console.error("Ticket status update error:", error);

        return res.status(500).json({
            status: "error",
            message: "Unable to update ticket status."
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`OptxCare AI running at http://localhost:${PORT}`);
});
