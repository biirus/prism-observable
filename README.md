# @tutu/prism-observable

Утилита для использования redux-observable вместе с prism. Оборачивает epics, позволяя им работать с префикснутыми actions, а также с частью store, относящейся к компоненту.

### Repository

https://stash.tutu.ru/projects/frontend/repos/prism-observable/browse

### Clone

```sh
$ git clone ssh://git@depot.tutu.ru:7999/frontend/prism-observable.git
```

### Install

Устанавливаем @tutu/prism-observable в качестве зависимости

```sh
$ npm install @tutu/prism-observable --save
```

### Usage

```javascript
import { combineEpics } from 'redux-observable';
import { wrapEpic } from '@tutu/prism-observable';

import fetchStations from '../Station/epic';
import fetchDates from '../Date/epic';


export default combineEpics(
	wrapEpic(fetchStations, 'Arrival', s => s.arrival),
	wrapEpic(fetchStations, 'Departure', s => s.departure),
	wrapEpic(fetchDates, 'Date'),		// третий аргумент — селектор — опционален
);
```

В данном случае один и тот же epic используется для 2 разных компонентов. Например, если по умолчанию эпик fetch умеет принимать action type `'Fetch'`, то после оборачивания — `'Departure.Fetch'`, `'Arrival.Fetch'`.
