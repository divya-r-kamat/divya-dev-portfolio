# Advanced Tab Manager

# Advanced Tab Manager

Are you tired of having a dozen tabs open, struggling to find the one you need, while your browser chews through your computer’s memory? You’re not alone. Tab overload is a common problem for developers, researchers, and just about anyone who spends their day online.

We’ve all been there. You start with a handful of tabs, and before you know it, your browser window is a long line of tiny favicons. This isn’t just a visual mess—it’s a productivity killer and a performance drain.

But what if you could take control?

## Why I Built This

I decided to build my own solution: a Chrome extension that not only helps you organize your tabs but also gives you a clear view of how they’re impacting your system’s performance.

### Goals:
- **Clarity**: A single view of all open tabs.
- **Efficiency**: A way to identify and close tabs that are no longer needed.
- **Organization**: A simple method for grouping related tabs.

---

## How It’s Built: The Code Behind the Scenes

Building a Chrome extension is a great way to combine HTML, CSS, and JavaScript into a practical, shareable project.

### 1. The Blueprint (`manifest.json`)
Every extension needs a manifest file to tell Chrome what it is and what permissions it needs.  
We ask for permissions to access and manage tabs, tab groups, and system memory. This is our foundation.

### 2. The Brain (`background.js`)
This script is a service worker that runs in the background.  
It’s the central hub for our extension’s logic. It listens for events like a tab being activated or closed, allowing us to track the last active time for each tab.  
It also handles all communication from the popup, performing actions like grouping or closing tabs.

### 3. The Front-End (`popup.html` & `popup.js`)
This is what the user sees.  
- `popup.html` provides the structure for our table, buttons, and input fields.  
- `popup.js` handles user interactions, sends messages to the background script, and dynamically updates the table with data received from the background.

---

## Overcoming a Major Hurdle: The `processes` API

One of the biggest challenges was getting per-tab memory usage.  
I initially planned to use the `chrome.processes` API, but discovered it’s only available on the developer channel of Chrome—not the stable version.

Instead of giving up, I pivoted.  
I used the `chrome.system.memory` API, which is stable, to provide a high-level view of system memory.  
This still gives users a useful indicator of how a large number of tabs might be affecting their computer’s performance without relying on an unstable API.

---

## Demo

Here’s a quick video demonstration of the extension in action:  
 [Watch on YouTube](https://youtu.be/Zh1o7ap8WNA)

I’ve learned a lot building this extension, and I hope this walkthrough encourages you to create your own tools to solve everyday problems.

**Happy coding!**

*Posted on 10/26/2025*