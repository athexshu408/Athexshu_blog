export const LoginStart = (userCredentials)=>({
    type:"LOGING_START"
})

export const LoginSuccess=(user)=>({
    type:"LOGING_SUCCESS",
    payload: user, 
});

export const LoginFailure = ()=>({
    type:"LOGIN_FAILURE"
});

export const Logout = ()=>({
    type:"LOGOUT"
});


export const UpdateStart = (userCredentials)=>({
    type:"UPDATE_START"
})

export const UpdateSuccess=(user)=>({
    type:"UPDATE_SUCCESS",
    payload: user, 
});

export const UpdateFailure = ()=>({
    type:"UPDATE_FAILURE"
});


export const UpdateFormPStart = (userCredentials)=>({
    type:"UPDATEFORM_START"
})

export const UpdateFormPSuccess=(user)=>({
    type:"UPDATEFORM_SUCCESS",
    payload: user, 
});

export const UpdateFormFailure = ()=>({
    type:"UPDATEFORM_FAILURE"
});
