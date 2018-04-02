import {ENTITY_ID} from "./const.js";
import {NotFoundFactId, handleError} from "./errors.js";
import console from "./console.js";

const isSimple = (value) => {
	let type = typeof value;
	return type !== "object" && type !== "function" && type !== "undefined" || value === null
};

export default class Fact {
	/**
	 * @throw {NotFoundFactId}
	 * */
	constructor(data){
		try {
			for ( let key in data ) {
				if (!data.hasOwnProperty(key)){
					return;
				}

				if (isSimple(data[key])){
					this[key] = data[key];
				} else {
					console.warn(`[Fact] value of prop "${key}" has an unspecified value: ${data[key]}`)
				}
			}
			if (! (ENTITY_ID in this) ){
				throw new NotFoundFactId()
			}
		} catch (error){
			handleError(error);
		}
	}
}