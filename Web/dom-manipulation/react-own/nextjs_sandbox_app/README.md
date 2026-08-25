# Next.js Server and Client Components

This project helps us understand the difference between server components and client components in Next.js.

## What is a Server Component?

In the App Router, components are server components by default. They run on the server and are used for:

- fetching data
- accessing backend resources
- using environment variables
- rendering content without browser APIs
- keeping the client bundle smaller

Server components can be async and directly fetch data from a database or API.

Example:

```tsx
async function Courses() {
  const response = await fetch("https://api.example.com/courses");
  const courses = await response.json();

  return (
    <ul>
      {courses.map((course) => (
        <li key={course.id}>{course.title}</li>
      ))}
    </ul>
  );
}
```

### Why use Server Components?

- better performance because less JavaScript is sent to the browser
- secure: database credentials and private logic stay on the server
- great for pages, layouts, dashboards, and data-heavy views
- works well with SEO because the HTML is rendered on the server

## What is a Client Component?

A client component is a component that runs in the browser and can use browser APIs, event listeners, state, and effects.

To make a component a client component, add this line at the top:

```tsx
"use client";
```

Example:

```tsx
"use client";

import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);

  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}
```

### Why use Client Components?

Use client components when you need:

- React state with useState
- event handlers like onClick, onChange
- browser APIs like localStorage, window, document
- interactivity such as modals, forms, dropdowns, tabs, and toggles

## When to use Server Components

Use a server component when the component is mainly for:

- fetching data
- rendering static or dynamic content from a backend
- protecting secrets or database access
- admin pages, dashboards, blog pages, product listings

Example:

```tsx
export default async function Page() {
  const products = await fetchProducts();

  return (
    <main>
      <h1>Products</h1>
      {products.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </main>
  );
}
```

## When to use Client Components

Use a client component when the component needs:

- user interaction
- animation
- local state updates
- form validation
- custom UI behavior in the browser

Example:

```tsx
"use client";

import { useState } from "react";

export function SearchBox() {
  const [query, setQuery] = useState("");

  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search..."
    />
  );
}
```

## Important Rule

Server components cannot use:

- useState
- useEffect
- browser-only APIs
- click handlers like onClick

Client components can use these, but they are more expensive because they are hydrated in the browser.

## Simple Rule of Thumb

- Use a Server Component by default.
- Use a Client Component only when you need interactivity.

### Good server component examples

- page layout
- blog post page
- product listing page
- dashboard summary cards that read data

### Good client component examples

- search input
- shopping cart quantity buttons
- modal popup
- dropdown menu
- theme toggle

## Example in This Project

In this app, the main page is a server component by default. It can render data and pass JSX to child components. If we add a component that uses user interaction, such as a button with state or a form input, then that child should be a client component.

```tsx
import { Courses } from "./components/courses";
import { AllCaps } from "./components/allcaps";

export default function Home() {
  return (
    <main>
      <h1>Tony Aliceas Courses</h1>
      <AllCaps>
        <Courses />
      </AllCaps>
    </main>
  );
}
```

This page is a server component, because it renders content and does not need browser-only interactivity.

If we later add a button like this, it must be a client component:

```tsx
"use client";

export default function ToggleButton() {
  return <button onClick={() => alert("Clicked!")}>Click Me</button>;
}
```

## Summary

Server Components:

- default in Next.js app router
- fetch data securely on the server
- best for rendering pages and data
- faster and lighter for the browser

Client Components:

- require 'use client'
- used for interactive UI
- can use state and browser events
- should be used only when necessary

The best practice is to keep most of your app as server components and only convert the small interactive parts into client components.

## Run the Project

```bash
pnpm dev
```

Then open http://localhost:3000 in your browser.
