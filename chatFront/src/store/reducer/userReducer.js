const defaultState = {
    user: false,
};

const userReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_USER': {
            return {
                user: action.payload
            }
        }
        default: {
            return state;
        }
    }
};
  
export default userReducer;