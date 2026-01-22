# logs del proyecto

* Se creo un entorno de desarrollo en vscode para trabajar

## Capitulo 1 Getting Started
https://nextjs.org/learn/dashboard-app/getting-started

* se instalo pnpm 
``` bash
npm install -g pnpm
```
* se instalo el ejemplo en el entorno de desarrollo
``` bash
npx create-next-app@latest nextjs-dashboard --example "https://github.com/vercel/next-learn/tree/main/dashboard/starter-example" --use-pnpm

cd nextjs-dashboard
```

* /app: Contains all the routes, components, and logic for your application, this is where you'll be mostly working from.
* /app/lib: Contains functions used in your application, such as reusable utility functions and data fetching functions.
* /app/ui: Contains all the UI components for your application, such as cards, tables, and forms. To save time, we've pre-styled these components for you.
* /public: Contains all the static assets for your application, such as images.
* Config Files: You'll also notice config files such as next.config.ts at the root of your application. Most of these files are created and pre-configured when you start a new project using create-next-app. You will not need to modify them in this course.

For this project, we've provided some placeholder data in app/lib/placeholder-data.ts. Each JavaScript object in the file represents a table in your database. For example, for the invoices table:

``` Ts
const invoices = [
  {
    customer_id: customers[0].id,
    amount: 15795,
    status: 'pending',
    date: '2022-12-06',
  },
  {
    customer_id: customers[1].id,
    amount: 20348,
    status: 'pending',
    date: '2022-11-14',
  },
  // ...
];
```

# Capitulo 2 CSS Styling

Global styles

If you look inside the /app/ui folder, you'll see a file called global.css. You can use this file to add CSS rules to all the routes in your application - such as CSS reset rules, site-wide styles for HTML elements like links, and more.

You can import global.css in any component in your application, but it's usually good practice to add it to your top-level component. In Next.js, this is the root layout (more on this later).

Add global styles to your application by navigating to /app/layout.tsx and importing the global.css file:
/app/layout.tsx

import '@/app/ui/global.css';
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

With the development server still running, save your changes and preview them in the browser. Your home page should now look like this:
Styled page with the logo 'Acme', a description, and login link.

But wait a second, you didn't add any CSS rules, where did the styles come from?

If you take a look inside global.css, you'll notice some @tailwind directives:
/app/ui/global.css

@tailwind base;
@tailwind components;
@tailwind utilities;


## Tailwind


is a CSS framework that speeds up the development process by allowing you to quickly write utility classes
directly in your React code.

In Tailwind, you style elements by adding class names. For example, adding "text-blue-500" will turn the <h1> text blue:

<h1 className="text-blue-500">I'm blue!</h1>

Although the CSS styles are shared globally, each class is singularly applied to each element. This means if you add or delete an element, you don't have to worry about maintaining separate stylesheets, style collisions, or the size of your CSS bundle growing as your application scales.

When you use create-next-app to start a new project, Next.js will ask if you want to use Tailwind. If you select yes, Next.js will automatically install the necessary packages and configure Tailwind in your application.

If you look at /app/page.tsx, you'll see that we're using Tailwind classes in the example.
/app/page.tsx

import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
 
export default function Page() {
  return (
    // These are Tailwind classes:
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
    // ...
  )
}

Don't worry if this is your first time using Tailwind. To save time, we've already styled all the components you'll be using.

Let's play with Tailwind! Copy the code below and paste it above the <p> element in /app/page.tsx:
/app/page.tsx

<div
  className="relative w-0 h-0 border-l-[15px] border-r-[15px] border-b-[26px] border-l-transparent border-r-transparent border-b-black"
/>

## CSS Modules

CSS Modules allow you to scope CSS to a component by automatically creating unique class names, so you don't have to worry about style collisions as well.

We'll continue using Tailwind in this course, but let's take a moment to see how you can achieve the same results from the quiz above using CSS modules.

Inside /app/ui, create a new file called home.module.css and add the following CSS rules:
/app/ui/home.module.css

.shape {
  height: 0;
  width: 0;
  border-bottom: 30px solid black;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
}

Then, inside your /app/page.tsx file import the styles and replace the Tailwind class names from the <div> you've added with styles.shape:
/app/page.tsx

import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import styles from '@/app/ui/home.module.css';
 
export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className={styles.shape} />
    // ...
  )
}

Save your changes and preview them in the browser. You should see the same shape as before.

Tailwind and CSS modules are the two most common ways of styling Next.js applications. Whether you use one or the other is a matter of preference - you can even use both in the same application!
It’s time to take a quiz!

Using the clsx library to toggle class names

There may be cases where you may need to conditionally style an element based on state or some other condition.

clsx
is a library that lets you toggle class names easily. We recommend taking a look at documentation
for more details, but here's the basic usage:

    Suppose that you want to create an InvoiceStatus component which accepts status. The status can be 'pending' or 'paid'.
    If it's 'paid', you want the color to be green. If it's 'pending', you want the color to be gray.

You can use clsx to conditionally apply the classes, like this:
/app/ui/invoices/status.tsx

import clsx from 'clsx';
 
export default function InvoiceStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-sm',
        {
          'bg-gray-100 text-gray-500': status === 'pending',
          'bg-green-500 text-white': status === 'paid',
        },
      )}
    >
    // ...
)}


