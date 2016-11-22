import test from 'ava'
import {Api} from '../'
import {isObject, isFunction} from 'sav-util'

test('Api#api', ava => {
  ava.ture(isFunction(Api))
  let api = new Api()
  ava.ture(isObject(api))
  ava.ture(isFunction(api.declare))
  ava.ture(isFunction(api.setBaseUrl))
  ava.ture(isFunction(api.setAjax))
})
