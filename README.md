
# OptxCare AI – IT Support Assistant

OptxCare AI is a web-based IT support assistant designed to help users troubleshoot common Windows, Linux, and network-related technical issues. It also includes an IT support ticket management system.

## Features

- Rule-based chatbot with keyword matching
- Windows and Linux troubleshooting guides
- Network and connectivity troubleshooting
- Suggested questions for quick access
- Light and dark mode
- Chat timestamps and typing indicator
- IT support ticket submission
- Ticket dashboard with Open and Resolved status management
- JSON-based ticket storage
- Responsive user interface

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Node.js
- Express.js
- JSON
- Git and GitHub

## Project Structure

```text
optxcare-ai/
├── .gitignore
├── knowledge/
│   └── troubleshooting.js
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── tickets/
│   ├── ticketStore.js
│   └── tickets.json
├── server.js
├── package.json
└── README.md
```

## Installation and Setup



1. Clone the repository:

   `git clone https://github.com/dassramesh/optxcare-ai.git`


2. Navigate to the project folder:

   ```bash
   cd optxcare-ai
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the server:

   ```bash
   node server.js
   ```

5. Open your browser and visit:

   ```text
   http://localhost:3000
   ```

## How It Works

The chatbot uses predefined troubleshooting knowledge and keyword matching to identify common IT issues and return relevant troubleshooting instructions.

Users can also submit IT support tickets. Tickets are stored in a JSON file and displayed on a dashboard, where their status can be updated.

## Current Limitations

- The chatbot uses rule-based keyword matching rather than a generative AI model.
- Troubleshooting coverage is limited to the issues included in its knowledge base.
- Ticket data is stored locally in a JSON file.

## Future Improvements

- Expand the troubleshooting knowledge base.
- Add user authentication and role-based access.
- Integrate a database for ticket management.
- Add more advanced issue classification.

## Author

Developed as a portfolio project to demonstrate frontend development, Node.js, Express.js, and IT support troubleshooting concepts.
