/*
UserProvider.tsx:

- The UserProvider component is a wrapper component that provides access to the User Context and its state to its children.
- It uses the 'MyUserContextProvider' from "@/hooks/useUser", which internally handles fetching and managing the user data, as well as handling user state changes.
- The 'MyUserContextProvider' is imported and used as a wrapper for the children, meaning all child components will have access to the User Context.
- It takes a single prop: 'children', which can be any valid React nodes.

Details:

- This component simplifies the usage of user context, allowing child components to consume the context without worrying about fetching or updating the context data.
*/

"use client";

import { MyUserContextProvider } from "@/hooks/useUser";

// Define the props expected by the UserProvider component
interface UserProviderProps {
    children: React.ReactNode;
}

// Define the UserProvider component
const UserProvider: React.FC<UserProviderProps> = ({
    children
}) => {
    // Use the MyUserContextProvider to wrap the children,
    // providing them with access to the user context.
    return (
        <MyUserContextProvider>
            {children}
        </MyUserContextProvider>
    );
}

export default UserProvider;