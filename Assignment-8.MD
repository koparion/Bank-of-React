# React Router

## Lesson Objectives:

* Describe the difference between server-side and client-side routing
* Add client-side routing to our React apps using React Router
* Set up React Router to enable common browser behavior
* Understand built in React Router components (Route, BrowserRouter, Routes, Link, Navigate)

## Client-side Routing

Client-side `routing` is a bit of a misnomer. 

On the server, `routing` generally refers to the way we 
define the URLs and RESTful resources that make up our application. Whether 
we are asking for data from the database or persisting data, our server 
needs to know where the data lives. Server `routes` help us keep track of this information.

In the browser, things are a little different. When we build Single-Page Applications, we render 
our data inside of the browser. The data lives on a server, so our data's "addresses" have 
been defined elsewhere. We only need to know what these pre-defined addresses are to consume them. 
We'll still have a lot of different `views` for our data, and we won't want to 
show all of them on the page at once. Client-side `routing` is how we'll describe 
which views we are showing on the page at any given time.

## Routing in React
There is no way to handle client-side routing in the React library.  Instead, there are multiple libraries available to handle this specific task.  The most popular library is called `React Router`.  This library is hands down the most popular solution for client-side routing.  Recently, `React Router` made a major overhaul to their library with the release of `v6`.  In the newest version, the team behind `React Router` refactored the library to make everything just a regular React components.  Some online tutorials have not yet updated their libraries, so we recommend using the [official docs](https://reactrouter.com/docs/en/v6/getting-started/overview)

## Setting up React Router

React Router is going to allow us to swap out sets of components using familiar 
"routing" patterns, rather than writing lots of complicated `if-statements` in our JavaScript.

To demonstrate the power of this tool, we're going to build a personal banking application, where we can
independently display the Debits and Credits made to each account.

### Set up:

Before we jump into React Router, let's create a fresh React application in our class exercises folder:

```bash
$ create-react-app bank-of-react
```

Let's start up our application and make sure everything looks good before we move on.

### Installing React Router:


React Router is packaged up nicely in `npm`. We can use `npm` to quickly pull the Router 
code into our application. The package we'll need is `react-router-dom`:

```bash
$ npm install react-router-dom@6
```

### Setting Up the Router:

* Now that we've pulled in the React Router code, we need to create a new Router within 
our application. Because React is not a browser-only framework, the React Router team has 
provided for us a few different routers, specific to each environment. For our browser-rendered 
React applications, we'll want to use the `BrowserRouter`. 

Let's go into our `App.js` and pull in the `BrowserRouter`, along with Routes and Route, 
which we will for React Router to work properly in our app. 

Let's also take the opportunity to clear out our React boilerplate and replace it with "Hello, World!":
    
```jsx harmony
    import React, { useState } from 'react';
    import { BrowserRouter, Routes, Route } from 'react-router-dom';
    
    function App() {
       return (
           <div className="App">
             Hello, World!
           </div>
       );
     }
    
    export default App;
  ```

* Once we've imported our Router, the only set-up left is to wrap our top-level component inside 
of a `<BrwoserRouter />` component, like so:

    ```jsx harmony
    import React, { useState } from 'react';
    import { BrowserRouter, Routes, Route } from 'react-router-dom';
    
    function App() {
        return (
            <BrowserRouter>
              <div className="App">
                Hello, World!
              </div>
            </BrowserRouter>
        );
      }
    
    export default App;
    ```
* With a few very simple lines of code, all of the goodness of React Router becomes available 
to us. Let's explore!

### Creating Routes

* Let's add a Home component to our application. The first thing we'll need to do is create our component:

```jsx harmony
    // src/components/Home.js
    
    import React from 'react';
    
    function Home(props) {
        return (
            <div>
              <img src="https://res.cloudinary.com/andreahabib/image/upload/v1642026304/React_Bank_dk7n1a.png" alt="bank"/>
              <h1>Bank of React</h1>
            </div>
        );
      }
    
    export default Home;
```

* Now that we have a nicely packaged `Home` component, we'll want to display this component on the 
page instead of the obligatory "Hello, World!". We could simply mount this component on the `App.js` 
component, like we've done in the past. This would work absolutely fine, but what will happen once 
we've navigated away from this page? 

    **How would we get back to the very simple, static `Home` page that we've set up for ourselves?**
    
* We could create a "flag" on the `state` of the main component called `showHomePage` and whenever 
`showHomePage === true` we'd replace everything else with the `Home` component. This would work, but 
in the long run we'd have to pass `showHomePage` as a `prop` to any component that needed to link back 
to the `Home` component. 

    This may seem doable for a small application. However, if we were to "scale" this to any 
    reasonably-sized app, we'd quickly see that every component would need `if-statements` for each
    and every page it could possibly link to. Our component structure would quickly become 
    un-manageable. We haven't even displayed our `Home` page yet, and the need for 
    React Router has already set in...
    
* Instead of simply mounting our `Home` component, let's instead assign a `Route` to it. We 
can do this very simply by importing the `Route` component from `react-router-dom` and mounting it 
within our `App.js`. Let's try it out:

    ```jsx harmony
    import React, { useState } from 'react';
    import { BrowserRouter, Routes, Route } from 'react-router-dom';
    import Home from './components/Home';
    
    function App() {
        return (
            <BrowserRouter>
              <Routes>
                <Route path="/" element={Home}/>
              </Routes>
            </BrowserRouter>
        );
      }
    
    export default App;
    ```
    
* If we check the browser, we should now see our Home page rendered instead of the previous "Hello,
World!". Let's break down the new syntax:

    ```jsx harmony
    ...
    <Route path="/" element={Home}/>
    ...
    ```
    
* The first thing we should notice is that adding `Routes` to our application is as simple as mounting 
any other component. All we have to do is import it and mount it with some props passed in. The props 
that we are using tell the `Route` to mount a `Home` component any time the browser sees a request to 
the '/' route.

**By Default, more than one route can be rendered at a time. We don't have a use case to show multiple routes, so we will wrap our code in a `<Routes>` component to make sure we only show the results of one route at a time. For more info about routes, check out [this link](https://reactrouter.com/docs/en/v6/getting-started/overview)** 

### Passing Props to Routes
* Now let's add some `props` to our `Home` component! On our banking home page, we'll want 
to view our account balance. Let's create an `AccountBalance` component and pass the 
balance as a `prop`. We'll want to use this information elsewhere, so we'll keep the value on the 
`state` of our `App.js`.

    ```jsx harmony
    // src/components/AccountBalance.js
  
    import React from 'react';
    
    function AccountBalance(props) {
        return (
            <div>
              Balance: {props.accountBalance}
            </div>
        );
      }
    
    export default AccountBalance;
    ```

    ```jsx harmony
    // src/components/Home.js
  
    import React from 'react';
    import AccountBalance from './AccountBalance';
    
    function Home(props) {
        return (
            <div>
              <img src="https://res.cloudinary.com/andreahabib/image/upload/v1642026304/React_Bank_dk7n1a.png" alt="bank"/>
              <h1>Bank of React</h1>
              
              <AccountBalance accountBalance={props.accountBalance}/>
            </div>
        );
      }
    
    export default Home;
    ```

    ```jsx harmony
    // src/components/App.js
    // add this before the return
    ...
    const [accountBalance, setAccountBalance] = useState(14568.27)
    ...
    ```
    
* Now we have all of the pieces set up. We just need to tell our `"/" Route` to pass the `accountBalance` 
as a prop each time it loads the `Home` component. We might try something like this:

    ```jsx harmony
    <Route path="/" element={<Home accountBalance={accountBalance}/>}/>
    ```
* Now you should be able to see the account balance along with an image of a bank!

### Linking to Routes

* Now that we have set up a Route for our `Home` component, we can navigate back to the component at any time. 
Let's build out a `UserProfile` page and create a `Route` for it in our `App.js`:

    ```jsx harmony
    // src/components/UserProfile.js
    
    import React from 'react';
    
    function UserProfile(props) {
        return (
            <div>
              <h1>User Profile</h1>
    
              <div>Username: {props.userName}</div>
              <div>Member Since: {props.memberSince}</div>
            </div>
        );
      }
    
    export default UserProfile;
    ```
  
    ```jsx harmony
    // src/App.js
    
    import React, { useState } from 'react';
    import { BrowserRouter, Routes, Route } from 'react-router-dom';
    import Home from './components/Home';
    import UserProfile from './components/UserProfile';
    
    function App() {
    
    const [accountBalance, setAccountBalance] = useState(14568.27)
    const [currentUser, setCurrentUser] = useState({ userName: "bob_loblaw", memberSince: '08/23/99' })
    
        return (
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home accountBalance={accountBalance}/>}/>
                <Route path="/userProfile" element={<UserProfile userName={currentUser.userName} memberSince={currentUser.memberSince}  />}/>
              </Routes>
            </BrowserRouter>
        );
      }
    
    export default App;
    ```

* If we type `http://localhost:3000/userProfile` into our browser, we see our new `UserProfile` on the screen.
This isn't a great user experience, obviously. Let's instead add a link to our `UserProfile` from the `Home` 
component. React Router provides another very simple solution for this: the `Link` component.

    ```jsx harmony
    import React from 'react';
    import AccountBalance from './AccountBalance';
    import { Link } from 'react-router-dom';
    
    function Home(props) {
        return (
            <div>
              <img src="https://res.cloudinary.com/andreahabib/image/upload/v1642026304/React_Bank_dk7n1a.png" alt="bank"/>
              <h1>Bank of React</h1>
    
              <Link to="/userProfile">User Profile</Link>
    
              <AccountBalance accountBalance={props.accountBalance}/>
            </div>
        );
      }
    
    export default Home;
    ```

* React Router's `Link` component takes a very simple prop `to=` that tells us where we want to redirect. **We can 
link to any of our components, even within child components, as long as a `Route` has been initialized next to 
or above the `Link` in our tree of components.**

### You Do: Linking Back to the Home Component (5 minutes)

* We are now able to view our `UserProfile` component through the `Home` page link, but we are left stranded 
once we get there. Let's improve our user experience by adding a link back to the `Home` component inside of 
the `UserProfile` component.

### Programattic Redirects

While the `<Link>` component is really powerful, it requires a user interaction to navigate to another route.  There are plenty of use cases that require a redirect outside of user clicks.  One common example is wanting to redirect after a form is submitted.  When this happens, we need to use the `<Navigate>` component that is build into React Router.  Let's take a look at this mock `Sign In` component that we can add to our bank.

```js
  // App.js
  ...
  import LogIn from "./components/LogIn";
  ...
  const mockLogIn = (logInInfo) => {
    const newUser = {...currentUser}
    newUser.userName = logInInfo.userName
    setCurrentUser(newUser)
  }
  ...
  <Route path="/login" element={<LogIn user={currentUser} mockLogIn={mockLogIn}/>}/>
  ...
```

```js
// Login.js
import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'

function LogIn(props) {
  
  const [user, setUser] = useState({ userName: "", password: "" })
  const [redirect, setRedirect] = useState(false)


  const handleChange = (e) => {
    const updatedUser = {...user}
    const inputField = e.target.name
    const inputValue = e.target.value
    updatedUser[inputField] = inputValue

    setUser(updatedUser)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    props.mockLogIn(user)
    setRedirect(true)
  }

    if (redirect) {
      return (<Navigate to="/userProfile"/>)
    }
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="userName">User Name</label>
            <input type="text" name="userName" onChange={handleChange} value={user.userName} />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" />
          </div>
          <button>Log In</button>
        </form>
      </div>
    )
  }

export default LogIn
```

### LAB: Adding Debits and Credits

Let's add some more features to our banking app, using the following `User Stories`!

* The Debits index endpoint is located at `https://moj-api.herokuapp.com/debits`
* The Credits index endpoint is located at `https://moj-api.herokuapp.com/credits`

#### Updating the Account Balance 

```text
Making the Account Balance dynamic:

GIVEN I am on any page displaying the Account Balance
WHEN I view the Account Balance display area
THEN I should see an Account Balance that accurately represents my Debits subtracted from my Credits
AND I should be able to see a negative account balance if I have more Debits than Credits
```

#### Adding Debits
```text
Viewing the Debits page:

GIVEN I am on the Home Page
WHEN I click on 'Debits'
THEN I should be redirected to the Debits page
AND I should see a title of 'Debits' on the page
```

```text
Displaying debits:

GIVEN I am on the Debits page
WHEN I view the Debits display area
THEN I should see all of my debits displayed
AND each Debit should display a Debit description
AND each Debit should display a Debit amount
AND each Debit should display a Debit date
```

```text
Viewing the Account Balance on the Debits page:

GIVEN I am on the Debits page
WHEN I view the Account Balance display area
THEN I should see my Account Balance displayed
```

```text
Adding debits:

GIVEN I am on the Debits page
WHEN I enter a new Debit description
AND WHEN I enter a new Debit amount
AND WHEN I click 'Add Debit'
THEN I should see my new debit added to the Debits display area with the current date
AND I should see my Account Balance updated to reflect the new Debit
```

```text
Viewing the Account Balance on the Debits page:

GIVEN I am on the Debits page
WHEN I view the Account Balance display area
THEN I should see my Account Balance displayed
```

#### Adding Credits

```text
Viewing the Credits page:

GIVEN I am on the Home Page
WHEN I click on 'Credits'
THEN I should be redirected to the Credits page
AND I should see a title of 'Credits' on the page
```

```text
Displaying debits:

GIVEN I am on the Credits page
WHEN I view the Credits display area
THEN I should see all of my Credits displayed
AND each Debit should display a Debit description
AND each Debit should display a Debit amount
AND each Debit should display a Debit date
```

```text
Viewing the Account Balance on the Credits page:

GIVEN I am on the Credits page
WHEN I view the Account Balance display area
THEN I should see my Account Balance displayed
```

```text
Adding Credits:

GIVEN I am on the Credits page
WHEN I enter a new Debit description
AND WHEN I enter a new Debit amount
AND WHEN I click 'Add Debit'
THEN I should see my new debit added to the Credits display area with the current date
AND I should see my Account Balance updated to reflect the new Debit
```

```text
Viewing the Account Balance on the Credits page:

GIVEN I am on the Credits page
WHEN I view the Account Balance display area
THEN I should see my Account Balance displayed
```