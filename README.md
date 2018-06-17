## To build
Step 1: `npm install` or `yarn install`  
Step 2: `netlify-lambda serve functions`  
Step 3: In a separate console, run `npm run dev`  

## Custom widgets
You can easily add custom widgets in 2 easy steps.
Step 1: Add your new component to the `components/Widgets` directory.
Step 2: Register your component in the `components/Widgets/widgets.js` file. 

But what if your widget needs it's own vuex store?

### Add vuex store for widget
Just add a [vuex module file](https://vuex.vuejs.org/en/modules.html) for your widget in the `store` directory. 
There are several example files in there already.

But what if I need to run some server-side code?

### Add a serverless (Lambda) function for your widget
Lambda functions live in the `functions` directory. You can add your own by merely creating your function and saving it in the directory.
*Note:* if you need to use an `npm` library, you need to add it to the `package.json` located in the `functions` directory, as functions are built separately from the rest of the project.


