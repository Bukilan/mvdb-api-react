const initalState = {
    list: [],
    page: 1,
    genre: '',
};


export function items(state = initalState, action) {
    switch (action.type) {
        case 'ITEMS_FETCH_DATA_SUCCESS':
            return {
                ...state,
                list: action.payload,
                page: action.payload_page,
                genre: action.payload_genre,
            };

        default:
            return state ;
    }
}