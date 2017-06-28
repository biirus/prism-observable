# prism-observable

This package fixes the problem of multiple same epics. You can read more about epics here https://redux-observable.js.org. 
By default epics can listen certain actions, but if those actions came from same components epic could not differ it.

That's why we should pass some identifier (prefix or smth else) to totaly define correct action.


### Install

```sh
$ npm install prism-observable --save
```

### Usage

```javascript
import { combineEpics } from 'redux-observable';
import { wrapEpic } from 'prism-observable';

// the target epic 
const fetchCities = action$ => {
	return action$.ofType('FETCH')
		.debounceTime(300)		
	    .switchMap(({ url }) =>
	      ajax({url: url, crossDomain: true})	        
			.map(result => ({
				type: 'FULFILL',
				payload: result.response
			}))			
	    );
}


// the function identifier
// it listen all possible actions apply to regexp
const getPrefix = action => {
	const match = action.type.match(/^routes\.[\d].(from|to)/);
	return match ? match[0] : null;
}

export default combineEpics(
	wrapEpic(fetchCities, getPrefix),
);

```

The function `getPrefix` makes possible to listen actions such as `routes.1.from.FETCH`, `routes.0.to.FETCH`... After epic makes it's deal `wrapEpic` wraps the output action by appending the prefix. It case `routes.1.from.FETCH` you will get `routes.1.from.FULFILL`

### API

The signature is `wrapEpic(epic, getPrefix, selector)`;

| Name           | Type                | Required        | Description                                                                                                                                                                                                                              |
|----------------|---------------------|-----------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `epic`         | `function`          | `true`          | The target epic to wrap                                                                                                                                                                                                                  |
| `getPrefix`    | `function | string` | `true`          | If you pass a function all actions will be passed through it and prefix will be gained by that function. But you can pass a static prefix as a string.                                                                                   |
| `selector`     | `function`          | `false`         | The state slice selector for the second epic argument. 
