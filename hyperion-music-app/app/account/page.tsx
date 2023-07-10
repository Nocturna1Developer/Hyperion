/*
Account.tsx:

- This is a React Functional Component that constructs the account settings page.
- The component imports and uses 'Header' for the page header and 'AccountContent' for the main content of the page.

Details:

- The 'Header' component is used to display the page header. It receives CSS classes as props to control its appearance.
- Inside the 'Header' component, a 'div' is used to group the page title, which is an 'h1' element with the text "Account Settings".
- The 'AccountContent' component is used to display the main content of the account settings page.
- The page is wrapped in a 'div' that uses several CSS classes to control its appearance and behavior.
*/
// Import the 'Header' component from the components directory.
import Header from "@/components/Header";

// Import the 'AccountContent' component from the current directory's components.
import AccountContent from "./components/AccountContent";

// Define the 'Account' component.
const Account = () => {
    // Return the JSX for the component.
    return (
        <div
            // Set the CSS classes for the outer div.
            className="
            bg-neutral-900 
            rounded-lg 
            h-full 
            w-full 
            overflow-hidden 
            overflow-y-auto"
        >
            <Header className="from-bg-neutral-900">
                <div className="mb-2 flex flex-col gap-y-6">
                    <h1 className="text-white text-3xl font-semibold">
                        Account Settings
                    </h1>
                </div>
            </Header>
            <AccountContent />
        </div>
    )
}

// Export the 'Account' component as default.
export default Account;
