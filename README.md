# Travel Buddy ![TB_logo](https://github.com/SiddheshSonar/Travel-Buddy_Recur/blob/52b86f36f1444a33f69dbf67ce97e62efdef9eac/client/src/assets/logo-hck.svg)

Travel Buddy is an innovative travel planner that integrates image recognition, natural language processing, and text-to-speech capabilities to provide users with personalized information and recommendations about travel destinations. With Travel Buddy, users can effortlessly explore new places, ask questions, and receive spoken responses, making trip planning more interactive and enjoyable.

## Preview
Watch the whole demo [here](https://drive.google.com/file/d/1E1nYGoL79EdYI3O9lFckhY9hmmFvW3Ib/view?usp=sharing)

![image](https://github.com/SiddheshSonar/Travel-Buddy_Recur/assets/100956337/0be382ce-11d0-464b-8c0a-1b8cc0a97378)

![image](https://github.com/SiddheshSonar/Travel-Buddy_Recur/assets/100956337/bab5e991-29ba-4cae-9a47-258826dc0033)

![image](https://github.com/SiddheshSonar/Travel-Buddy_Recur/assets/100956337/5c96a226-867c-4934-8106-8f5861186833)


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
