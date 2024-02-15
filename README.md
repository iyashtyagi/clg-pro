# Text-to-Image Generator

Welcome to our Text-to-Image Generator project! This application utilizes cutting-edge AI models to generate images based on text prompts. Users can create and share their generated images with the community. The project is built using the MERN stack along with the Hugging Face `stabilityai/stable-diffusion-xl-base-1.0` model and Cloudinary for image storage.

## Features

- **Text-to-Image Generation:** Utilizes the `stabilityai/stable-diffusion-xl-base-1.0` model to generate images from text prompts.
- **Community Sharing:** Users can share their generated images with the community.
- **Search Functionality:** Users can search for specific image prompts.
- **Download:** Users can download shared posts.

## Tech Stack

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **AI Model:** `stabilityai/stable-diffusion-xl-base-1.0`
- **Image Storage:** Cloudinary

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/your-repository.git
    ```

2. Navigate to the project directory:

    ```bash
    cd your-repository
    ```

3. Install dependencies for the client:

    ```bash
    cd client
    npm install
    ```

4. Install dependencies for the server:

    ```bash
    cd ../server
    npm install
    ```

5. Navigate back to the root directory:

    ```bash
    cd ..
    ```

6. Access the application at `http://localhost:3000`.

## API Endpoints

### `/api/v1/post`

- **GET:** Fetch shared posts.
- **POST:** Share a generated image with the community.

### `/api/v1/imgGenerate`

- **POST:** Generate an image based on a text prompt.

## Contributing

We welcome contributions from the community! Feel free to open issues, submit pull requests, or suggest new features.

## License

This project is licensed under the [MIT License](LICENSE).
