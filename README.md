# FlexxCart

FlexxCart is a modern e-commerce website designed by styled components to provide a seamless shopping experience with the use of redux. The app allows users to browse products by category, add them to a cart, and perform basic mock authentication and authorization. It integrates React and TypeScript with Redux for state management and uses React Query for efficient data fetching and caching.

## Features

- **Browse Products**: Fetch product data from the FakeStore API.
- **Shopping Cart**: Add, remove, and manage items in the cart.
- **Mock Authentication**: Simulate login and authorization for user-based interactions.
- **Mock PaymentGateway**: Basic Payment mock UI with the 50% chance to success or fail.
- **Persistent Notifications**: Provide feedback with React Hot Toaster.
- **Dynamic Routing**: Navigate seamlessly with React Router.
- **Customizable UI**: Styled with Material UI and Styled Components.

## Limitations

Due to the limitations of the FakeStore API:
- **Dynamic Cart Operations**: The cart functionality is static and does not persist changes to the backend.
- **User Data by Login**: User-specific data cannot be retrieved using JSON keys or tokens.
- **Search Functionality**: There is no built-in support for search features.

These limitations make FlexxCart an ideal project for learning and practicing frontend development, but not fully production-ready for dynamic user interactions.

## Technologies Used

- **React**: For building the user interface.
- **Redux**: For managing global state.
- **TypeScript**: For type safety and improved developer experience.
- **React Query**: For handling server-state and API interactions.
- **React Router**: For navigation and routing.
- **Axios**: For making HTTP requests.
- **Material UI**: For responsive and pre-styled components.
- **Styled Components**: For modular and reusable CSS-in-JS styling.
- **React Hot Toaster**: For showing toast notifications.
