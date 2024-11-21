/**
 * This file is the base for Home Page.
 * It is default page to be displayed.
 */
import Footer from "../components/Footer";

export const Home = () => {
    return (
        <div className="mx-auto">
            <div>
                <h1 className="text-4xl font-bold">ReactJS</h1>
                <p>React (also known as React.js or ReactJS) is a free and open-source front-end JavaScript library for building user interfaces based on components by Facebook Inc. It is maintained by Meta (formerly Facebook) and a community of individual developers and companies.
                </p>

                <br />
                <p>React can be used to develop single-page, mobile, or server-rendered applications with frameworks like Next.js. Because React is only concerned with the user interface and rendering components to the DOM, React applications often rely on libraries for routing and other client-side functionality. A key advantage of React is that it only rerenders those parts of the page that have changed, avoiding unnecessary re-rendering of unchanged DOM elements. It was first launched on 29 May 2013.
                </p>
                <br />
                <h2 className="text-2xl font-bold">Declarative</h2>
                <br />
                <p>React adheres to the declarative programming paradigm. Developers design views for each state of an application, and React updates and renders components when data changes. This is in contrast with imperative programming.
                </p>
                <br />
                <h2 className="text-2xl font-bold">Components</h2>
                <p>React code is made of entities called components. These components are modular and reusable. React applications typically consist of many layers of components. The components are rendered to a root element in the DOM using the React DOM library. When rendering a component, values are passed between components through props (short for properties). Values internal to a component are called its state.

                    The two primary ways of declaring components in React are through function components and class components.</p>
                <br />
                <h2 className="text-2xl font-bold">Function components</h2><br />
                <p>Function components are declared with a function (using JavaScript function syntax or an arrow function expression) that accepts a single props argument and returns JSX. From React v16.8 onwards, function components can use state with the useState Hook.</p>
                <br />
            </div>
            <div className="mt-8">
                <Footer />
            </div>
        </div>
    );
};