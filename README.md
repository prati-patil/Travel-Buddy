
Travel Buddy is an innovative travel planner that integrates image recognition, natural language processing, and text-to-speech capabilities to provide users with personalized information and recommendations about travel destinations. With Travel Buddy, users can effortlessly explore new places, ask questions, and receive spoken responses, making trip planning more interactive and enjoyable.



## Features

- **Image Recognition:** Upload photos of places you're interested in visiting, and Travel Buddy will identify the location and provide relevant information.
- **Natural Language Processing (NLP):** Ask questions about destinations using natural language, and Travel Buddy will understand and respond accordingly.
- **Text-to-Speech:** Receive spoken responses from Travel Buddy, making the interaction more conversational and user-friendly.

## Technologies Used

- **Frontend:** Built with React.js for seamless user experience and responsiveness.
- **Backend:** Utilizes an Express server for CRUD operations and a Flask server to run machine learning models for image recognition and response generation.
- **Machine Learning Models:**
  - **Text Generation:** Employs The Mixtral-8x7B Large Language Model (LLM) (https://huggingface.co/mistralai/Mixtral-8x7B-Instruct-v0.1) for generating responses to user queries.
  - **Image Recognition:** Utilizes (https://picarta.ai) for accurately identifying locations from uploaded images.

## Installation

To set up Travel Buddy locally, follow these steps:

1. Clone this repository to your local machine.
2. You would also need the Google Maps API key, Hugging Face API key and also Picarta API Token. (https://picarta.ai/api) 
3. Navigate to the project directory.
4. Install dependencies for both the frontend and backend.
5. Run the frontend and backend servers.
6. Access Travel Buddy through your web browser.

Happy Travels with Travel Buddy! 🌍✈️
