
/**
 * THIS IS GENERATED CODE. Do not edit it. It will be overwritten when you generate the component again.
 * 
 * 
 * MIT License
 * Copyright (c) 2024 Broken Atom
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * 
 */

import { useEffect, useRef, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
	Routes,
	Route,
	Link,
	useNavigate,
} from "react-router-dom";

import { 
    motion, 
    AnimatePresence 
} from "framer-motion";

import { Subscription } from "rxjs";
import {observer} from "mobx-react-lite"

// EVERY IMPORT HAS TO BE ../module/file-name


import GFN from '../../GFN';
import AS from "../../gfn/AS";
import UTILS from "@/utils/index";

import {OBJ_WITH_ID, T_INFO, T_QUERY_PARAMS} from "../types";
import { GC } from "../../global_state";
import { subscribe_selected_one } from "@/utils/selected-one";
import { expose_state } from "@/utils/expose-state";
import fallbackRender from "@/utils/ErrorBoundaryFallback";
import { generate_query_id } from "@/utils/draft";



// import { T_INFO } from "../../types/comp";
// import { T_QUERY_PARAMS } from "../../types/query";
// import { OBJ_WITH_ID } from "../../types/g-type";



// INJECT IMPORTS HERE
// b@imports









const EN_BROKEN_COMP_LOGS = window.EN_BROKEN_COMP_LOGS || {};




// local code - e.g sub components
// b@locals

const BROKEN_JSX = () => <div className="flex items-center justify-center text-gray-500 font-semibold bg-gray-100">DEFAULT GET_MANY </div>






// b@comp-name
const COMP_NAME = (props: any) => {

	// RxJs Subscriptions - to be destroyed on unmount
	const subs = useRef<Subscription[]>([]);



	// FOR IS_MANY
	let idx = props.idx;   // also for protection from error when we might think is many but it's not
	let V = props.V || {}; // for protection from error

	// b@freeze
	const FREEZE = props.freeze;	// frozen data - so that we don't query db, This wi



	// STATES
	const MIDATA 						= FREEZE 
											? GFN.GET_ARRAY(FREEZE) 
											: GFN.GET_ARRAY(props.M);		// model initial data
	const [M,  SET_M ] 					= useState(MIDATA);					// model data
	const [SM, SET_SM] 					= useState(null);					// selected model data

	
	const [errors,		set_errors]		= useState([]);
	const [warnings,	set_warnings]	= useState([]);


	const [show_relation_table, set_show_relation_table] = useState(false);

	
	// REPLACE INFO HERE - NEXT LINE after b@
	// b@info
const INFO: T_INFO  = { mid: "vjnou", cid: "comp_bce9q4", idx: idx, cidx: idx, model_name: "user", prop_name: props.pm_pn, op: "get_many"};


	// DYNAMIC VARIABLES & FUNCTIONS
	const B		: any = {}; // contains actions and common functions
	const VARS	: any = {}; // contains variables
	const FNS	: any = {}; // contains functions
	

    // USER DEFINED STATES
    // b@states

	


    // REFS
    // USER DEFINED REFS
    // b@refs




	// QUERY
	// b@query
	const query:T_QUERY_PARAMS|null = null;


	// FILTERS - for get_many


	// RELATION
	// b@relation
	let relation:{model_id: string, comp_id: string, prop_name: string}|null = null;

	


	// EFFECTS FOR GET_MANY
	useEffect(()=>{
		// if FREEZE is set then we will not query db
		if(FREEZE) return; 
		// @ts-ignore
		if(MIDATA?.__freeze) return;

		init();

		return () => {
			// if(INITIALIZING.value) return; // don't unsubscribe if initializing. There is a strange react unmount bug happeing
			subs.current.forEach(s=>s.unsubscribe());
		}
	}, []);
	


	// FROM PARENT
	// useEffect(()=>{
	// 	GFN.bro_get_one(INFO, set_M, props);
	// }, [props]);



	

	// LOGS
	useEffect(()=>{
		if(EN_BROKEN_COMP_LOGS.MODEL_EFFECT){
			const MI = INFO.model_name.toUpperCase() + " : " + INFO.op.toUpperCase();
			console.log("MODEL CHANGED : " + MI + "   => ", "model", M, " props", props);
		}
	}, [M]);


    // USER DEFINED EFFECTS
    // b@effects





	// FUNCTIONS

	const set_pre = (M: OBJ_WITH_ID[]): OBJ_WITH_ID[] => {
		return M;
	}

	const set_post = (M: OBJ_WITH_ID[]): OBJ_WITH_ID[] => {
		return M;
	}


	const init = async () => {
		const mid = INFO.mid;
		const cid = INFO.cid;
		if(!mid || !cid) return console.warn("NO MODEL ID OR COMP ID FOUND");


		// remove all previous subs
		subs.current.forEach(s=>s.unsubscribe()); subs.current = [];



		// default query id
		const qid = INFO.query?.qid || generate_query_id(cid, idx);



		if(INFO.query) INFO.query.qid = qid;
		//STORE QUERY IN GSTORE
		if(query) AS.GSTORE.set_query(mid, qid, query, ["GET MANY GRID COMP"]);

		// query id provided by user || default query id
		subs.current.push(AS.GSTORE.subscribe_many(mid, qid, (e)=>{
			const data = e.data.data || [];
			SET_M(set_pre(data));
		}));



		// on create, delete, update
		subs.current.push(AS.GSTORE.subscribe((e)=>{
			if(e.mid !== mid) return;

			
			// on delete query again // @todo: this can be optimised further by checking if the deleted entity is in the list of this data
			if(e.type === "ONE_ENTITY_EVENT" && e.name === "delete"){
				GFN.bro_get_many({}, M, INFO, props, idx);
				return;
			}


			// on update // this can be optimised further by checking if the updated entity is in the list of this data
			if(e.type === "ONE_ENTITY_EVENT" && e.name === "update"){
				// console.log('UPDATE EVENT FIRED');
				GFN.bro_get_many({}, M, INFO, props, idx);
				return;
			}

			if(e.type === "ONE_ENTITY_EVENT" && e.name === "create"){
				// remove models cached list // this will remove for all components
				AS.GSTORE.remove_cached_list(mid);
				GFN.bro_get_many({}, M, INFO, props, idx);
				return;
			}
		}));


		// on filter change => subs
		subs.current.push(AS.GSTORE.subscribe((e)=>{
			if(e.type !== "QUERY_PARAMS_EVENT") return;
			if(e.mid !== mid || e.qid !== qid) return;

			// QP changed => again query
			GFN.bro_get_many({}, M, INFO, props, idx);
		}));


		// query first time
		GFN.bro_get_many({}, M, INFO, props, idx);



		// subscribe to selected entity
		subscribe_selected_one(INFO.mid, subs.current, SET_SM);


		return () => {
			// if(INITIALIZING.value) return; // don't unsubscribe if initializing. There is a strange react unmount bug happeing
			subs.current.forEach(s=>s.unsubscribe());
		}
	}




    // USER DEFINED FUNCTIONS
    // b@functions


	const get_all_props_array  = () => {
		const mid = INFO.mid;
		const models = GC.APP_JSON.models
		if(!models || !Array.isArray(models)) {
			console.warn("NO MODELS FOUND in APPJSON IN GC", mid);
			return [];
		}
		const model  = models.find(m=>m.id === mid);
		if(!model || !model.id) {
			console.warn("NO MODEL FOUND", mid);
			return [];
		}
		const props = model.props;
		if(!props || !Array.isArray(props)) {
			console.warn("NO PROPS FOUND", mid);
			return [];
		}
		return props.map(p=>p.name);
	}




	// STATEMENTS
	INFO.SET_M          = SET_M;
	INFO.query		  	= query || undefined;
	INFO.on_created     = props.on_created 	|| props.INFO?.on_created;
	INFO.on_selected    = props.on_selected || props.INFO?.on_selected;

    // USER DEFINED STATEMENTS
    // b@statements




	// CONDITIONALS ATTRS
	const COND_ATTRS = {};
	//b@cond-attrs







	// DYNAMIC REACT STATES
	const REACT_STATES: {[name: string]: {state: any, set_state: any, defaultValue?: any}} = {};
    // b@dynamic-states
    // we are also using REACT_STATES to generate some dynamic state from html <state> tag, or from state attr

	expose_state(REACT_STATES, AS, INFO, "M", M, SET_M);
    // exposing this will help us in getting this data for debuging purpose



	// MAPPED DATA
const MAPPED_DATA = {};
	// b@mapped-data



	// USER CODE - Extra code written by user
	// b@user-code

	// b@user-code-end



	return (
		<ErrorBoundary fallbackRender={fallbackRender} onReset={(d) => { console.error(d) }}>

            <div b-type="model" b-parent="b8eblb" b-id="bce9q4" b-findex="a0" mid="vjnou" name="user" op="get_many" className="relative w-full flex flex-col bg-white p-2 shadow rounded" onClick={(e) => set_show_relation_table(false)} comp-temp="get_many_table"  >
                
            <div b-type="div" b-parent="bce9q4" b-id="bdgxbd" b-findex="a0" name="title" className="text-2xl font-medium text-gray-600 text-left"  >
                LIST OF user
            </div>
        

            <table b-type="table" b-parent="bce9q4" b-id="bt1me5" b-findex="a1" className="border-collapse border"  >
                
            <thead b-type="thead" b-parent="bt1me5" b-id="bm7fun" b-findex="a0"  >
                
            <tr b-type="tr" b-parent="bm7fun" b-id="bcaece" b-findex="a0" className="border border-collapse"  >
                
            <th b-type="span" b-parent="bcaece" b-id="bfreg7" b-findex="a0" react-tag="th" className="border border-collapse"  >
                email
            </th>
        

            <th b-type="span" b-parent="bcaece" b-id="b7zfp7" b-findex="a1" react-tag="th" className="border border-collapse"  >
                name
            </th>
        

            <th b-type="span" b-parent="bcaece" b-id="bxpzqh" b-findex="a2" react-tag="th" className="border border-collapse"  >
                images
            </th>
        

            <th b-type="span" b-parent="bcaece" b-id="b5kw3e" b-findex="a3" react-tag="th" className="border border-collapse"  >
                id
            </th>
        
            </tr>
        
            </thead>
        

            <tbody b-type="tbody" b-parent="bt1me5" b-id="beupln" b-findex="a1"  >
                
		{(()=>{
			const D = GFN.GET_ARRAY(M); ;
			return D.map(
				(M, idx)=>{
					return (
            <tr b-type="tr" b-parent="beupln" b-id="bf71w0" b-findex="a0" className="border border-collapse" b-mapid={'bf71w0--' + (V.id || idx)} key={V.id || idx} >
                
            <td b-type="span" b-parent="bf71w0" b-id="bsqp0b" b-findex="a0" react-tag="td" className="border border-collapse" b-mapid={'bf71w0--' + (V.id || idx)}  >
                
            <div b-type="prop" b-parent="bsqp0b" b-id="b7w0qz" b-findex="a0" name="email" className="flex flex-col  w-full gap-6" b-mapid={'bf71w0--' + (V.id || idx)}  >
                
            <span b-type="span" b-parent="b7w0qz" b-id="bxocng" b-findex="a0" b-mapid={'bf71w0--' + (V.id || idx)}  >
                {M.email}
            </span>
        
            </div>
        
            </td>
        

            <td b-type="span" b-parent="bf71w0" b-id="b60lvx" b-findex="a1" react-tag="td" className="border border-collapse" b-mapid={'bf71w0--' + (V.id || idx)}  >
                
            <div b-type="prop" b-parent="b60lvx" b-id="blcxn9" b-findex="a0" name="name" className="flex flex-col  w-full gap-6" b-mapid={'bf71w0--' + (V.id || idx)}  >
                
            <span b-type="span" b-parent="blcxn9" b-id="br9ot7" b-findex="a0" b-mapid={'bf71w0--' + (V.id || idx)}  >
                {M.name || ''}
            </span>
        
            </div>
        
            </td>
        

            <td b-type="span" b-parent="bf71w0" b-id="bfuf1p" b-findex="a2" react-tag="td" className="border border-collapse" b-mapid={'bf71w0--' + (V.id || idx)}  >
                
				{(()=>{
					const D = GFN.GET_ARRAY(M, ["images"]);
					return D.map(
						(V, idx)=> (
							
            <div b-type="prop" b-parent="bfuf1p" b-id="b6ag7b" b-findex="a0" name="images" className="flex flex-col  w-full gap-6" b-mapid={'bf71w0--' + (V.id || idx)} key={V.id} >
                
            <div b-type="div" b-parent="b6ag7b" b-id="bkk9m8" b-findex="a0" name="image" style={{backgroundImage:`url(${V?.v?.url})`}} className="w-32 h-32  flex flex-shrink-0 bg-no-repeat bg-gray-200 bg-center bg-cover rounded-md" b-mapid={'bf71w0--' + (V.id || idx)}  >
                
            </div>
        
            </div>
        
						)
					)
				})()}
			
            </td>
        

            <td b-type="span" b-parent="bf71w0" b-id="b4v9lj" b-findex="a3" react-tag="td" className="border border-collapse" b-mapid={'bf71w0--' + (V.id || idx)}  >
                
            <div b-type="prop" b-parent="b4v9lj" b-id="b8rizx" b-findex="a0" name="id" className="flex flex-col  w-full gap-6" b-mapid={'bf71w0--' + (V.id || idx)}  >
                
            <span b-type="span" b-parent="b8rizx" b-id="b8sz2u" b-findex="a0" b-mapid={'bf71w0--' + (V.id || idx)}  >
                {M.id || ''}
            </span>
        
            </div>
        
            </td>
        
            </tr>
        )
				}
			)
		})()}
	
            </tbody>
        
            </table>
        
            </div>
        
		</ErrorBoundary>
	)
}

export default observer(COMP_NAME);