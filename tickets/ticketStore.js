
const fs = require("fs");
const path = require("path");

const ticketsFile = path.join(__dirname, "tickets.json");

function getTickets() {
    if (!fs.existsSync(ticketsFile)) {
        return [];
    }

    try {
        return JSON.parse(
            fs.readFileSync(ticketsFile, "utf8")
        );
    } catch (error) {
        return [];
    }
}

function saveTicket(ticket) {
    const tickets = getTickets();

    tickets.push(ticket);

    fs.writeFileSync(
        ticketsFile,
        JSON.stringify(tickets, null, 4)
    );

    return ticket;
}

// Update ticket status
function updateTicketStatus(ticketId, status) {
    const tickets = getTickets();

    const ticketIndex = tickets.findIndex(
        ticket => ticket.ticketId === ticketId
    );

    if (ticketIndex === -1) {
        return null;
    }

    tickets[ticketIndex].status = status;

    fs.writeFileSync(
        ticketsFile,
        JSON.stringify(tickets, null, 4)
    );

    return tickets[ticketIndex];
}

module.exports = {
    getTickets,
    saveTicket,
    updateTicketStatus
};
