import test from 'ava'
import {Api} from '../'
import {isObject, isFunction} from 'sav-util'

test('Api#api', ava => {
  ava.true(isFunction(Api))
  let api = new Api()
  ava.true(isObject(api))
  ava.true(isFunction(api.declare))
  ava.true(isFunction(api.setBaseUrl))
  ava.true(isFunction(api.setAjax))
})
