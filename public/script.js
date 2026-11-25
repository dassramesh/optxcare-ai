
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const chatMessages = document.getElementById("chatMessages");
const welcome = document.querySelector(".welcome");
const clearChatBtn = document.getElementById("clearChatBtn");
const themeToggle = document.getElementById("themeToggle");

// Ticket form elements
const ticketForm = document.getElementById("ticketForm");
const ticketName = document.getElementById("ticketName");
const ticketIssue = document.getElementById("ticketIssue");
const submitTicketBtn = document.getElementById("submitTicketBtn");
const ticketFormMessage = document.getElementById("ticketFormMessage");

// Scroll to latest message
function scrollToLatestMessage() {
    chatMessages.scrollTo({
        top: chatMessages.scrollHeight,
        behavior: "smooth"
    });
}

// Add message timestamp
function addTimestamp(messageElement) {
    const timestamp = document.createElement("span");

    timestamp.classList.add("message-time");

    timestamp.textContent = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    messageElement.appendChild(timestamp);
}

// Display chat message
function addMessage(message, sender) {
    const messageElement = document.createElement("div");

    messageElement.classList.add("message");

    if (sender === "user") {
        messageElement.classList.add("user-message");
    } else {
        messageElement.classList.add("ai-message");
    }

    const messageText = document.createElement("div");
    messageText.classList.add("message-text");
    messageText.textContent = message;

    messageElement.appendChild(messageText);

    addTimestamp(messageElement);

    chatMessages.appendChild(messageElement);

    scrollToLatestMessage();

    return messageElement;
}

// Create typing indicator
function createTypingIndicator() {
    const typingIndicator = document.createElement("div");

    typingIndicator.classList.add(
        "message",
        "ai-message",
        "typing-indicator"
    );

    for (let i = 0; i < 3; i++) {
        const dot = document.createElement("span");
        typingIndicator.appendChild(dot);
    }

    chatMessages.appendChild(typingIndicator);

    scrollToLatestMessage();

    return typingIndicator;
}

// Send message to backend
async function sendMessage() {
    const message = userInput.value.trim();

    if (!message || sendBtn.disabled) return;

    welcome.style.display = "none";

    addMessage(message, "user");

    userInput.value = "";

    sendBtn.disabled = true;
    sendBtn.textContent = "Sending...";

    userInput.disabled = true;

    const typingIndicator = createTypingIndicator();

    const startTime = Date.now();

    try {
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message })
        });

        let data;

        try {
            data = await response.json();
        } catch {
            throw new Error("Invalid response from the support service.");
        }

        const elapsedTime = Date.now() - startTime;

        if (elapsedTime < 800) {
            await new Promise(resolve =>
                setTimeout(resolve, 800 - elapsedTime)
            );
        }

        if (!response.ok) {
            throw new Error(data.reply || "Something went wrong.");
        }

        if (!data.title || !data.reply) {
            throw new Error(
                "The support service returned an incomplete response."
            );
        }

        typingIndicator.remove();

        addMessage(data.title + "\n\n" + data.reply, "ai");

    } catch (error) {
        typingIndicator.remove();

        addMessage(
            "Unable to connect to the support service. Please try again.",
            "ai"
        );

        console.error("Chat Error:", error);

    } finally {
        sendBtn.disabled = false;
        sendBtn.textContent = "Send ↑";

        userInput.disabled = false;
        userInput.focus();
    }
}

// Clear conversation
function clearChat() {
    chatMessages.innerHTML = "";

    userInput.value = "";
    userInput.disabled = false;

    sendBtn.disabled = false;
    sendBtn.textContent = "Send ↑";

    welcome.style.display = "block";

    userInput.focus();
}

// Apply selected theme
function applyTheme(isDarkMode) {
    document.body.classList.toggle("dark-mode", isDarkMode);

    themeToggle.textContent = isDarkMode
        ? "☀️ Light Mode"
        : "🌙 Dark Mode";
}

// Toggle and save theme
function toggleTheme() {
    const isDarkMode =
        !document.body.classList.contains("dark-mode");

    localStorage.setItem(
        "optxcare-theme",
        isDarkMode ? "dark" : "light"
    );

    applyTheme(isDarkMode);
}

// Load saved theme
const savedTheme = localStorage.getItem("optxcare-theme");

applyTheme(savedTheme === "dark");

// Submit support ticket
async function submitTicket(event) {
    event.preventDefault();

    const name = ticketName.value.trim();
    const issue = ticketIssue.value.trim();

    if (!issue) {
        ticketFormMessage.textContent =
            "Please describe your technical issue.";
        return;
    }

    submitTicketBtn.disabled = true;
    submitTicketBtn.textContent = "Submitting...";
    ticketFormMessage.textContent = "";

    try {
        const response = await fetch("/api/tickets", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, issue })
        });

        const data = await response.json();

        if (!response.ok || data.status !== "success") {
            throw new Error(
                data.message || "Unable to submit your ticket."
            );
        }

        ticketFormMessage.textContent =
            "Ticket created successfully! Your Ticket ID is: " +
            data.ticket.ticketId;

        ticketForm.reset();

        await loadTickets();

    } catch (error) {
        ticketFormMessage.textContent =
            error.message || "Something went wrong. Please try again.";

        console.error("Ticket Error:", error);

    } finally {
        submitTicketBtn.disabled = false;

        submitTicketBtn.innerHTML =
            '<i class="fa-solid fa-paper-plane" aria-hidden="true"></i> Submit Ticket';
    }
}

// Event listeners
sendBtn.addEventListener("click", sendMessage);
clearChatBtn.addEventListener("click", clearChat);
themeToggle.addEventListener("click", toggleTheme);
ticketForm.addEventListener("submit", submitTicket);

// Suggested questions
const suggestionButtons =
    document.querySelectorAll(".suggestion-btn");

suggestionButtons.forEach(button => {
    button.addEventListener("click", function() {
        if (sendBtn.disabled) return;

        userInput.value = this.textContent;
        sendMessage();
    });
});

// Enter key support
userInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
    }
});

// Support Tickets Dashboard
const ticketsList = document.getElementById("ticketsList");
const refreshTicketsBtn = document.getElementById("refreshTicketsBtn");
const totalTicketsElement = document.getElementById("totalTickets");
const openTicketsElement = document.getElementById("openTickets");
const resolvedTicketsElement = document.getElementById("resolvedTickets");
const ticketsDashboardMessage =
    document.getElementById("ticketsDashboardMessage");

// Update ticket status
async function updateTicketStatus(ticketId, currentStatus) {
    const newStatus =
        currentStatus === "Open" ? "Resolved" : "Open";

    try {
        const response = await fetch(
            `/api/tickets/${encodeURIComponent(ticketId)}/status`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ status: newStatus })
            }
        );

        const data = await response.json();

        if (!response.ok || data.status !== "success") {
            throw new Error(
                data.message || "Unable to update ticket status."
            );
        }

        ticketsDashboardMessage.textContent =
            `Ticket ${ticketId} updated to ${newStatus}.`;

        await loadTickets();

    } catch (error) {
        ticketsDashboardMessage.textContent = error.message;

        console.error("Ticket Update Error:", error);
    }
}

// Load support tickets
async function loadTickets() {
    ticketsList.innerHTML =
        '<p class="empty-tickets">Loading support tickets...</p>';

    ticketsDashboardMessage.textContent = "";

    try {
        const response = await fetch("/api/tickets");
        const data = await response.json();

        if (!response.ok || data.status !== "success") {
            throw new Error("Unable to load support tickets.");
        }

        const tickets = data.tickets || [];

        const openCount = tickets.filter(
            ticket => ticket.status === "Open"
        ).length;

        const resolvedCount = tickets.filter(
            ticket => ticket.status === "Resolved"
        ).length;

        totalTicketsElement.textContent = tickets.length;
        openTicketsElement.textContent = openCount;
        resolvedTicketsElement.textContent = resolvedCount;

        if (tickets.length === 0) {
            ticketsList.innerHTML =
                '<p class="empty-tickets">No support tickets found.</p>';
            return;
        }

        ticketsList.innerHTML = "";

        tickets.forEach(ticket => {
            const ticketCard = document.createElement("div");
            ticketCard.className = "ticket-item";

            const header = document.createElement("div");
            header.className = "ticket-item-header";

            const title = document.createElement("h3");
            title.textContent = ticket.ticketId;

            const status = document.createElement("span");
            status.className = "ticket-status";

            if (ticket.status === "Resolved") {
                status.classList.add("resolved");
            }

            status.textContent = ticket.status;

            header.appendChild(title);
            header.appendChild(status);

            const name = document.createElement("p");
            name.textContent = "Name: " + ticket.name;

            const issue = document.createElement("p");
            issue.textContent = "Issue: " + ticket.issue;

            const date = document.createElement("p");
            date.textContent =
                "Created: " + new Date(ticket.createdAt).toLocaleString();

            const statusButton = document.createElement("button");
            statusButton.className = "ticket-status-btn";

            statusButton.textContent =
                ticket.status === "Open"
                    ? "Mark as Resolved"
                    : "Reopen Ticket";

            statusButton.addEventListener("click", () => {
                updateTicketStatus(ticket.ticketId, ticket.status);
            });

            ticketCard.appendChild(header);
            ticketCard.appendChild(name);
            ticketCard.appendChild(issue);
            ticketCard.appendChild(date);
            ticketCard.appendChild(statusButton);

            ticketsList.appendChild(ticketCard);
        });

    } catch (error) {
        ticketsList.innerHTML =
            '<p class="empty-tickets">Unable to load tickets. Please try again.</p>';

        ticketsDashboardMessage.textContent = error.message;

        console.error("Dashboard Error:", error);
    }
}

// Refresh tickets button
refreshTicketsBtn.addEventListener("click", loadTickets);

// Load tickets when page opens
loadTickets();
