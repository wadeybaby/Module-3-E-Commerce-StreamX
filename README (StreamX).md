STREAMX - ONLINE MOVIE RENTAL PLATFORM 

OVERVIEW:

StreamX is an online movie rental platform that offers pay-per-view access to a wide range of movies without requiring subscriptions. Our goal is to provide an affordable, flexible, and secure rental service that competes with platforms like Google Play Movies while offering a superior customer experience.

FEATURES:

-Pay-Per-View Rentals – Rent movies individually without a subscription.

-Tiered Pricing – Different price categories for new releases, classics, and indie films.

-Secure Payments – Only credit/debit card payments are accepted.

-User Accounts – Register, log in, and manage your rentals easily.

-Cart Functionality – Add multiple movies to a cart before proceeding to checkout.

-Movie Details – View trailers, descriptions, and user reviews before renting.

-Seamless Streaming – Watch rented movies instantly in high quality.

TECH STACK:

FRONTEND:

Vue.js (for UI/UX development)
Vuex (for state management)
Axios (for API requests)

BACKEND:

Node.js with express.js (for API development)
MySQL (for database storage and management)
JWT (for authentication and session management)

INSTALLATION & SETUP:
PREREQUISITES:
Node.js & npm
MySQL database

BACKEND SETUP:

1. Clone the repository:

https://github.com/indi06-star/StreamX

2. Install dependencies:
-npm install

3. Configure encironment  variables (.env file):
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASS=your_database_password
JWT_SECRET=your_jwt_secret

4. Start your backend server:
node --watch index.js

FRONTEND SETUP:

1. Navigate to the frontend directory:
cd frontend

2. Install dependencies:
npm install

3. Run the development server(frontend):
npm run serve


StreamX_Module_3/
├── Backend/
│   ├── config/
│   │   └── config.js
│   ├── controller/
│   │   ├── cartController.js
│   │   ├── comingsoonController.js
│   │   ├── moviesController.js
│   │   ├── paymentsController.js
│   │   ├── rentalsController.js
│   │   └── usersController.js
│   ├── middleware/
│   │   ├── cartMiddleware.js
│   │   └── middleware.js
│   ├── model/
│   │   ├── cartModel.js
│   │   ├── comingsoonModel.js
│   │   ├── moviesModel.js
│   │   ├── paymentsModel.js
│   │   ├── rentalsModel.js
│   │   └── usersModel.js
│   ├── routes/
│   │   ├── cartRouter.js
│   │   ├── comingsoonRouter.js
│   │   ├── moviesRouter.js
│   │   ├── paymentsRouter.js
│   │   ├── rentalsRouter.js
│   │   └── usersRouter.js
│   ├── node_modules/
│   ├── .env
│   ├── index.js
│   ├── package-lock.json
│   └── package.json
├── Frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── cart.vue
│   │   │   ├── Login.vue
│   │   │   ├── MoviesDetails.vue
│   │   │   ├── NavBar.vue
│   │   │   ├── Payment.vue
│   │   │   └── Signup.vue
│   │   ├── router/
│   │   │   └── index.js
│   │   ├── store/
│   │   │   └── index.js
│   │   ├── views/
│   │   │   ├── AboutView.vue
│   │   │   ├── AdminDashboardView.vue
│   │   │   ├── ComingSoonView.vue
│   │   │   ├── HomeView.vue
│   │   │   ├── MoviesView.vue
│   │   │   └── MyListView.vue
│   │   ├── App.vue
│   │   ├── main.js
│   │   └── registerServiceWorker.js
│   ├── .gitignore
│   ├── babel.config.js
│   ├── jsconfig.json
│   ├── package-lock.json
│   └── package.json
├── README.md


