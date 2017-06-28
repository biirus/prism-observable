const unwrap = (prefix, action) => ({
	...action,
	type: action.type.replace(`${prefix}.`, '')
})


const wrap = (prefix, action) => ({
	...action,
	type: `${prefix}.${action.type}`
})



const wrapEpic = (innerEpic, prefix, selector = f => f) => {
	const getPrefix = typeof prefix === 'string' ? () => prefix : prefix;

	let typePrefix;

	return (action$, store) => {
		action$.subscribe(action => typePrefix = getPrefix(action));

		const unwrapped$ = action$.map(action => unwrap(typePrefix, action));

		const original$ = innerEpic(unwrapped$, {
			...store,
			getState: () => selector(store.getState())
		});

		return original$.map(action => wrap(typePrefix, action))
	}
}

export { wrapEpic }
export default wrapEpic
