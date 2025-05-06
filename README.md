# Local Development

This document gives instructions on how to run this project locally.

## Installation

### Prerequisites

You need to the following dependencies for local development:

- Node.js
- npm
- vite

## Fork and Clone

1. Fork this repository via the GitHub interface.
2. Clone your forked repo:

```bash
git clone https://github.com/<your-username>/ai4mh-ui.git
cd ai4mh-ui
```

## Environment Setup

1. Create a `.env` file in the root directory and add the following env variables:

```ini
VITE_API_BASE_URL=http://localhost:5000/api
VITE_FRONTEND_BASE_URL=http://localhost:5173
```

!!!note Replace the values with your actual config.

## Install & run

1. Install dependencies with `npm install`
2. Make build with `npm build`, should pass with no errors
3. Verify the installation by running `npm run dev`
