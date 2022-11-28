import React from "react";

const Blogs = () => {
  return (
    <div className="w-3/4 mx-auto text-slate-300">
      <div className=" shadow-lg m-2 lg:m-5 p-6 bg-slate-600 rounded-lg">
        <h1 className="text-2xl font-bold pb-1">
          What are the different ways to manage a state in a React application?
        </h1>
        <p className="text-sm text-justify">
          Local (UI) state: Local state is data we manage in one or another
          component. Local state is most often managed in React using the
          useState hook. Global (UI) state: Global state is data we manage
          across multiple components. Global state is necessary when we want to
          get and update data anywhere in our app, or in multiple components at
          least. Server state: Data that comes from an external server that must
          be integrated with our UI state. Server state is a simple concept, but
          can be hard to manage alongside all of our local and global UI state.
          URL state: Data that exists on our URLs, including the pathname and
          query parameters. URL state is often missing as a category of state,
          but it is an important one.
        </p>
      </div>
      <div className=" shadow-lg m-2 lg:m-5 p-6 bg-slate-600 rounded-lg">
        <h1 className="text-2xl font-bold pb-1">
          How does prototypical inheritance work?
        </h1>
        <p className="text-sm text-justify">
          The Prototypal Inheritance is a feature in javascript used to add
          methods and properties in objects. It is a method by which an object
          can inherit the properties and methods of another object.
          Traditionally, in order to get and set the [[Prototype]] of an object,
          we use Object. getPrototypeOf and Object.
        </p>
      </div>
      <div className=" shadow-lg m-2 lg:m-5 p-6 bg-slate-600 rounded-lg">
        <h1 className="text-2xl font-bold pb-1">
          What is a unit test? Why should we write unit tests?
        </h1>
        <p className="text-sm text-justify">
          Essentially, a unit test is a method that instantiates a small portion
          of a application and verifies its behavior independently from other
          parts. Unit testing for React Apps means testing an individual React
          Component. Unit Testing is important for React Apps, as it helps in
          testing the individual functionality of React components. Moreover,
          any error in code can be identified at the beginning itself, saving
          time to rectify it at later stages.
        </p>
      </div>
      <div className="shadow-lg m-2 lg:m-5 p-6 bg-slate-600 rounded-lg">
        <h1 className="text-2xl font-bold pb-1">React vs. Angular vs. Vue?</h1>
        <p className="text-sm text-justify">
          Angular, developed by Google, was first released in 2010, making it
          the oldest of the lot. It is a TypeScript-based JavaScript framework.
          A substantial shift occurred in 2016 on the release of Angular 2 (and
          the dropping of the “JS” from the original name : AngularJS). Angular
          2+ is known as just Angular. Although AngularJS (version 1) still gets
          updates, we will focus the discussion on Angular.Vue, also known as
          Vue.js, is the youngest member of the group. It was developed by
          ex-Google employee Evan You in 2014. Over the last several years, Vue
          has seen a substantial shift in popularity, even though it doesn’t
          have the backing of a large company. The most current version is
          always announced on the official Vue website on their releases page.
          Contributors for Vue are supported by Patreon. It should be noted that
          Vue also has its own GitHub repo, and functions using
          TypeScript.React, developed by Facebook, was initially released in
          2013. Facebook uses React extensively in their products (Facebook,
          Instagram, and WhatsApp). Similar to Vue, the React developers also
          announce their newest version on the blog section of the React
          website.
        </p>
      </div>
    </div>
  );
};

export default Blogs;
