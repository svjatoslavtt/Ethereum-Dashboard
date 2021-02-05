import { ActionTypes, ActionTypesUnion } from "./actions"

type TokenType = {
	limit: any;
	length: number;
};

export type PieChartType = {
	value: number;
	title: string;
	color: string;
};

export type AddressState = {
	ethBalance: number;
	pieChartData: PieChartType[];
	tokens: TokenType | null;
	address: string;
	viewAddress: string;
	loading: boolean;
}

const addressDataInitialState: AddressState = {
	ethBalance: 0,
	pieChartData: [],
	tokens: null,
	address: localStorage.getItem('address') ?? '',
	viewAddress: '',
	loading: false,
}

export const reducer = (state = addressDataInitialState, action: ActionTypesUnion) => {
	console.log(action);
	
	switch (action.type) {
		case ActionTypes.LOGIN_SUCCESS:
			return {
				...state,
				address: action.payload.address,
			}
		case ActionTypes.SWITCH_ACCOUNT: 
			return {
				...state,
				address: action.payload.address
			}	
		case ActionTypes.CLEAR_PIE_CHART_DATA: 
			return {
				...state,
				pieChartData: [],
				ethBalance: 0,
				tokens: null,
			}
		case ActionTypes.LOGOUT: 
			return {
				...state,
				pieChartData: [],
				ethBalance: 0,
				address: '',
				tokens: null,
			}		
		case ActionTypes.GET_BALANCES_REQUEST:
			return {
				...state,
				loading: true,
			}
		case ActionTypes.GET_BALANCES_FAILED:
			return {
				...state,
				loading: false,
			}
		case ActionTypes.GET_BALANCES_SUCCESS: 
			const { items } = action.payload;
			const filteredItems = items && items.length && items.filter((item: any, idx: number) => idx < 10 && item);
			const findEthToken = items.find((item: any) => item.contract_ticker_symbol === 'ETH');
			const pieChartData = items.map((item: any) => ({
				value: item.quote,
				title: item.contract_ticker_symbol,
				color: '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0'),
			}));

			return {
				...state,
				pieChartData,
				ethBalance: Number(findEthToken.balance),
				tokens: {
					limit: filteredItems,
					length: items.length,
				},
				loading: false,
			}
		default: return state;	
	}
}