# Hyperion

## Check out the project here: https://hyperion-rho.vercel.app/

#### Full Stack Spotify Clone

This repository houses the codebase for a comprehensive Spotify clone, developed from the ground up using cutting-edge technologies including Next.js 13.4, React, Tailwind CSS, Supabase, PostgreSQL, and Stripe. The application mimics Spotify's popular features and functionalities, providing a realistic music streaming experience.

![Capture](https://github.com/Nocturna1Developer/Hyperion/assets/40129107/52eb658d-cacb-4a55-9501-f7cc5a0c96d3)


## Features

- **Dynamic User Interface**: Crafted with Next.js and React, the UI mirrors the sleek, user-friendly design of Spotify.
- **Style and Responsiveness**: Leveraged Tailwind CSS for modern, responsive design and fluid animations.
- **Database and Authentication**: Utilized Supabase atop PostgreSQL for backend operations, implementing secure user registration, login processes, and GitHub authentication.
- **Music Features**: Integrated functionalities for song upload, playback, favoriting, and playlist management.
- **Payment Processing**: Incorporated Stripe to handle premium subscriptions, enabling transactions and secure user billing information management.
- **Error Handling and Validation**: Implemented client form validation with react-hook-form and server error handling using react-toast.

## Tech Stack

- **Frontend**: React, Next.js, Tailwind CSS
- **Backend**: Supabase, PostgreSQL
- **Authentication**: Supabase Auth, GitHub OAuth
- **Payment Processing**: Stripe

## Installation and Setup

To run the project locally, follow these steps (you'll need Node.js and npm installed):

1. Clone this repository and navigate into it

    ```bash
    git clone https://github.com/yourusername/full-stack-spotify-clone.git
    cd full-stack-spotify-clone
    ```

2. Install the project dependencies

    ```bash
    npm install
    ```

3. Start the development server

    ```bash
    npm run dev
    ```

4. Open http://localhost:3000 in your browser to see the app running.

## Development Timeline

Here's a breakdown of the development process:

- **Environment Setup and Layout**: Initial setup and designing the app layout.
- **Supabase Setup and Types**: Setting up Supabase project and defining data types.
- **Auth Providers**: Establishing providers for authentication and Supabase.
- **Auth Modal**: Creating the authentication modal and implementing functionalities.
- **Upload Modal**: Implementing the song upload modal and associated functionalities.
- **Song Fetch and Display**: Fetching songs from the database and displaying them.
- **Favorites System**: Implementing functionality for users to favorite songs.
- **Player Component**: Creating the advanced player component for song playback.
- **Stripe Integration**: Incorporating Stripe for handling premium subscriptions and recurring payments.
- **Subscription Modal and Account Page**: Creating the subscription modal and account page for managing user subscriptions.
- **Deployment**: Deploying the application.

## Contribute

Contributions are always welcome! Please read the [contribution guidelines](CONTRIBUTING.md) first.

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.
