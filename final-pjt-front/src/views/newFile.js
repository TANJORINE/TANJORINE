import { ref, computed, onMounted, watch } from 'vue';
import { useExchangeRateStore } from '@/stores/exchangerate';

export default (() => {
const __VLS_setup = async () => {
const store = useExchangeRateStore();
const cost1 = ref(null);
const cost2 = ref(null);
const inputcost1 = ref(0);
const inputcost2 = ref(0);

const changeCost1 = function () {
// console.log(cost1.value.deal_bas_r)
// inputcost2.value = inputcost1*cost1.deal_bas_r.replace(',', '')/cost2.deal_bas_r.replace(',', '')*(cost1.cur_unit.includes('(')!==-1?1:100)
// inputcost2.value = inputcost1*cost1.deal_bas_r.replace(',', '')/cost2.deal_bas_r.replace(',', '')*(cost1.cur_unit.includes('(')!==-1?1:100)
// if ((cost1.value.cur_unit.includes('(') === false) && cost2.value.cur_unit.includes('(') === true ) {  // 일본, 인도네시아 x
//     inputcost2.value = inputcost1.value*cost1.value.deal_bas_r.replace(',', '')/cost2.value.deal_bas_r.replace(',', '')*100
//     console.log(100)
// } else {
//     inputcost2.value = inputcost1.value*cost1.value.deal_bas_r.replace(',', '')/cost2.value.deal_bas_r.replace(',', '')
//     console.log(cost2.value.cur_unit.includes('('))
//     console.log(cost1.value.cur_unit.includes('('))
//     console.log(cost2.value.cur_unit)
//     console.log(200)
// }
// inputcost2.value = value
};

const changeCost2 = function (value) {
inputcost1.value = inputcost2.value * cost2.value.deal_bas_r.replace(',', '') / cost1.value.deal_bas_r.replace(',', '') * (cost2.value.cur_unit.includes('(') !== -1 ? 1 : 100);
// inputcost1.value = value
console.log(2);
};

const currencyUnit1 = computed(() => (cur_nm) => {
return cur_nm.split(' ')[1] ? cur_nm.split(' ')[1] : cur_nm;
});

const currencyUnit2 = computed(() => (cur_nm) => {
return cur_nm.split(' ')[1] ? cur_nm.split(' ')[1] : cur_nm;
});

watch([cost1, cost2], ([newCost1, newCost2]) => {
// console.log(cost1.value === null)
// console.log(cost2)
if (cost1.value !== null && cost2.value !== null && inputcost1.value === 0 && inputcost2.value === 0) {
// inputcost1.value = 1
// inputcost2.value = changeCost2(inputcost2*cost2.deal_bas_r.replace(',', '')/cost1.deal_bas_r.replace(',', '')/(cost2.cur_unit.includes('(')!==-1?100:1))
// console.log(cost2)
// console.log(cost2.deal_bas_r)
// console.log(cost2.value.deal_bas_r)
}
});


onMounted(() => {
store.getCountries();
});
const __VLS_publicComponent = (await import('vue')).defineComponent({
setup() {
return {};
},
});

const __VLS_componentsOption = {};

let __VLS_name!: 'ExchangeRateView';
function __VLS_template() {
let __VLS_ctx!: InstanceType<import('./__VLS_types.js').PickNotAny<typeof __VLS_publicComponent, new () => {}>> & InstanceType<import('./__VLS_types.js').PickNotAny<typeof __VLS_internalComponent, new () => {}>> & {};
/* Components */
let __VLS_localComponents!: NonNullable<typeof __VLS_internalComponent extends { components: infer C; } ? C : {}> & typeof __VLS_componentsOption & typeof __VLS_ctx;
let __VLS_otherComponents!: typeof __VLS_localComponents & import('./__VLS_types.js').GlobalComponents;
let __VLS_own!: import('./__VLS_types.js').SelfComponent<typeof __VLS_name, typeof __VLS_internalComponent & typeof __VLS_publicComponent & (new () => { $slots: typeof __VLS_slots; }) >;
let __VLS_components!: typeof __VLS_otherComponents & Omit<typeof __VLS_own, keyof typeof __VLS_otherComponents>;
/* Style Scoped */
type __VLS_StyleScopedClasses = {} &
{ 'first-country'?: boolean; } &
{ 'second-country'?: boolean; };
let __VLS_styleScopedClasses!: __VLS_StyleScopedClasses | keyof __VLS_StyleScopedClasses | (keyof __VLS_StyleScopedClasses)[];
/* CSS variable injection */
/* CSS variable injection end */
let __VLS_templateComponents!: {};
{
({} as JSX.IntrinsicElements).div;
({} as JSX.IntrinsicElements).div;
(__VLS_x as JSX.IntrinsicElements)['div'] = {};
{
({} as JSX.IntrinsicElements).div;
({} as JSX.IntrinsicElements).div;
(__VLS_x as JSX.IntrinsicElements)['div'] = { class: ("first-country"), };
{
({} as JSX.IntrinsicElements).select;
({} as JSX.IntrinsicElements).select;
(__VLS_x as JSX.IntrinsicElements)['select'] = { value: ((__VLS_ctx.cost1)), };
// @ts-ignore
[cost1,];
for (const [country1] of (await import('./__VLS_types.js')).getVForSourceType(__VLS_ctx.store.countries)) {
// @ts-ignore
[store,];
{
({} as JSX.IntrinsicElements).option;
({} as JSX.IntrinsicElements).option;
(__VLS_x as JSX.IntrinsicElements)['option'] = { key: ((country1.cur_unit)), value: ((country1)), };
{
({} as JSX.IntrinsicElements).div;
({} as JSX.IntrinsicElements).div;
(__VLS_x as JSX.IntrinsicElements)['div'] = {};
(country1.cur_nm.split(' ')[0]);
(country1.cur_unit);
}
}
}
}
{
({} as JSX.IntrinsicElements).input;
({} as JSX.IntrinsicElements).input;
(__VLS_x as JSX.IntrinsicElements)['input'] = { type: ("text"), value: ((__VLS_ctx.inputcost1)), };
type __VLS_0 = JSX.IntrinsicElements['input'];
const __VLS_1: import('./__VLS_types.js').EventObject<typeof undefined, 'change', {}, __VLS_0['onChange']> = {
change: (__VLS_ctx.changeCost1)
};
// @ts-ignore
[inputcost1, changeCost1,];
}
if (__VLS_ctx.cost1) {
// @ts-ignore
[cost1,];
{
({} as JSX.IntrinsicElements).div;
({} as JSX.IntrinsicElements).div;
(__VLS_x as JSX.IntrinsicElements)['div'] = {};
if (__VLS_ctx.cost1 === __VLS_ctx.cost2) {
// @ts-ignore
[cost1, cost2,];
{
({} as JSX.IntrinsicElements).div;
({} as JSX.IntrinsicElements).div;
(__VLS_x as JSX.IntrinsicElements)['div'] = {};
{
({} as JSX.IntrinsicElements).p;
({} as JSX.IntrinsicElements).p;
(__VLS_x as JSX.IntrinsicElements)['p'] = {};
(__VLS_ctx.currencyUnit1(__VLS_ctx.cost1.cur_nm));
// @ts-ignore
[currencyUnit1, cost1,];
}
}
}
else {
{
({} as JSX.IntrinsicElements).div;
({} as JSX.IntrinsicElements).div;
(__VLS_x as JSX.IntrinsicElements)['div'] = {};
{
({} as JSX.IntrinsicElements).p;
({} as JSX.IntrinsicElements).p;
(__VLS_x as JSX.IntrinsicElements)['p'] = {};
(Math.round(__VLS_ctx.inputcost1 * 100) / 100);
// @ts-ignore
[inputcost1,];
(__VLS_ctx.currencyUnit1(__VLS_ctx.cost1.cur_nm));
// @ts-ignore
[currencyUnit1, cost1,];
}
}
}
}
}
else {
{
({} as JSX.IntrinsicElements).div;
({} as JSX.IntrinsicElements).div;
(__VLS_x as JSX.IntrinsicElements)['div'] = {};
{
({} as JSX.IntrinsicElements).p;
({} as JSX.IntrinsicElements).p;
(__VLS_x as JSX.IntrinsicElements)['p'] = {};
}
}
}
}
{
({} as JSX.IntrinsicElements).div;
({} as JSX.IntrinsicElements).div;
(__VLS_x as JSX.IntrinsicElements)['div'] = { class: ("second-country"), };
{
({} as JSX.IntrinsicElements).select;
({} as JSX.IntrinsicElements).select;
(__VLS_x as JSX.IntrinsicElements)['select'] = { value: ((__VLS_ctx.cost2)), };
// @ts-ignore
[cost2,];
for (const [country2] of (await import('./__VLS_types.js')).getVForSourceType(__VLS_ctx.store.countries)) {
// @ts-ignore
[store,];
{
({} as JSX.IntrinsicElements).option;
({} as JSX.IntrinsicElements).option;
(__VLS_x as JSX.IntrinsicElements)['option'] = { key: ((country2.cur_unit)), value: ((country2)), };
{
({} as JSX.IntrinsicElements).div;
({} as JSX.IntrinsicElements).div;
(__VLS_x as JSX.IntrinsicElements)['div'] = {};
(country2.cur_nm.split(' ')[0]);
(country2.cur_unit);
}
}
}
}
{
({} as JSX.IntrinsicElements).input;
({} as JSX.IntrinsicElements).input;
(__VLS_x as JSX.IntrinsicElements)['input'] = { type: ("text"), value: ((__VLS_ctx.inputcost2)), };
type __VLS_2 = JSX.IntrinsicElements['input'];
const __VLS_3: import('./__VLS_types.js').EventObject<typeof undefined, 'change', {}, __VLS_2['onChange']> = {
change: (__VLS_ctx.changeCost2)
};
// @ts-ignore
[inputcost2, changeCost2,];
}
if (__VLS_ctx.cost2) {
// @ts-ignore
[cost2,];
{
({} as JSX.IntrinsicElements).div;
({} as JSX.IntrinsicElements).div;
(__VLS_x as JSX.IntrinsicElements)['div'] = {};
if (__VLS_ctx.cost1 === __VLS_ctx.cost2) {
// @ts-ignore
[cost1, cost2,];
{
({} as JSX.IntrinsicElements).div;
({} as JSX.IntrinsicElements).div;
(__VLS_x as JSX.IntrinsicElements)['div'] = {};
{
({} as JSX.IntrinsicElements).p;
({} as JSX.IntrinsicElements).p;
(__VLS_x as JSX.IntrinsicElements)['p'] = {};
(__VLS_ctx.currencyUnit2(__VLS_ctx.cost2.cur_nm));
// @ts-ignore
[currencyUnit2, cost2,];
}
}
}
else {
{
({} as JSX.IntrinsicElements).div;
({} as JSX.IntrinsicElements).div;
(__VLS_x as JSX.IntrinsicElements)['div'] = {};
{
({} as JSX.IntrinsicElements).p;
({} as JSX.IntrinsicElements).p;
(__VLS_x as JSX.IntrinsicElements)['p'] = {};
(Math.round(__VLS_ctx.inputcost2 * 100) / 100);
// @ts-ignore
[inputcost2,];
(__VLS_ctx.currencyUnit2(__VLS_ctx.cost2.cur_nm));
// @ts-ignore
[currencyUnit2, cost2,];
}
}
}
}
}
else {
{
({} as JSX.IntrinsicElements).div;
({} as JSX.IntrinsicElements).div;
(__VLS_x as JSX.IntrinsicElements)['div'] = {};
{
({} as JSX.IntrinsicElements).p;
({} as JSX.IntrinsicElements).p;
(__VLS_x as JSX.IntrinsicElements)['p'] = {};
}
}
}
}
}
if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
__VLS_styleScopedClasses['first-country'];
__VLS_styleScopedClasses['second-country'];
}
declare var __VLS_slots: {};
return __VLS_slots;
}
const __VLS_internalComponent = (await import('vue')).defineComponent({
setup() {
return {
store: store,
cost1: cost1,
cost2: cost2,
inputcost1: inputcost1,
inputcost2: inputcost2,
changeCost1: changeCost1,
changeCost2: changeCost2,
currencyUnit1: currencyUnit1,
currencyUnit2: currencyUnit2,
};
},
});
return {} as typeof __VLS_publicComponent;
};
return {} as typeof __VLS_setup extends () => Promise<infer T> ? T : never;
})({} as any);
