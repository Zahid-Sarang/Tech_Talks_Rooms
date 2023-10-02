import { useCallback, useState, useRef } from "react";

export const useStateWithCallback = (initialState) => {
	const [state, setState] = useState(initialState);
	const cbRef = useRef();
	const updateState = useCallback((newState, cb) => {});
};
