import axios, { AxiosError, AxiosResponse } from "axios";

import { toast } from "react-toastify";

import { store } from "../stores/store";
import { User, UserFormValues } from "../models/user";
import { DietGoal, DietGoalFormValues } from "../models/dietGoal";
import { Food } from "../models/Food";
import { Meal, MealFormValues } from "../models/meal";
import { Weight, WeightFormValues } from "../models/weight";



const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve,delay)
    })
}

axios.defaults.baseURL='http://localhost:5000/api';


axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
    return config;
})

axios.interceptors.response.use(async response => {
        await sleep(1000);
        return response;
}, (error: AxiosError) => {
    const {data , status,config} = error.response as AxiosResponse;
    switch (status) {
        case 400:
        if(config.method === 'get' && data.errors.hasOwnProperty('id')) {
            toast.error('/not-found')
        }
        if(data.errors){
            const modalStateErrors = [];
            for( const key in data.errors){
                if(data.errors[key]){
                    modalStateErrors.push(data.errors[key])
                }
            }
            throw modalStateErrors.flat();
        }else{
            toast.error(data);
        }
            break;
        case 401:
            toast.error('unauthorised')
            break;
        case 403:
            toast.error('forbidden')
            break;
        case 404:
            toast.error('/not-found')
            break;
        case 500:
            store.commonStore.setServerError(data);
            toast.error('/server-error')
            break
    }
    return Promise.reject(error);
})


const responseBody  = <T> (response :AxiosResponse<T>) => response.data;

//store common axios requests

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const DietGoals ={
    details: (id:string) => requests.get<DietGoal>(`/goals/${id}`),
    create: (dietGoal: DietGoalFormValues) => requests.post<void>('/goals',dietGoal),
    update: (dietGoal: DietGoalFormValues) => requests.put<void>(`/goals/edit`,dietGoal),
    delete: (id:string) => requests.del<void>(`/goals/${id}`),
    deleteMealEntry: (goalId: string, mealId: string) => requests.del<void>(`/meals/${goalId}/${mealId}/deleteMealEntry`),
    deleteFoodEntry: (goalId: string, foodId: string) => requests.del<void>(`/foods/${goalId}/${foodId}/delete`)
}
const Foods ={
    list: () => requests.get<Food[]>('/foods'),
    delete: (id:string) => requests.del<void>(`/foods/${id}`),
    search: (foodName: string) => requests.get<Food[]>(`/foods/search?foodName=${foodName}`),
    add: (foodId: string, amountConsumed: number) =>requests.post<Food>(`/foods/${foodId}/add`, { amountConsumed }) 
}

const Meals ={
    list: () => requests.get<Meal[]>('/meals'),
    listEntries: (goalId: string) => requests.get<Meal[]>(`/meals/${goalId}/entries`),
    delete: (id:string) => requests.del<void>(`/meals/${id}`),
    create: (meal: MealFormValues) => requests.post<void>('/meals',meal),
    add: (mealId: string) =>requests.post<Meal>(`/meals/${mealId}/add`,{}) 
}

const WeightIns = {
    create: (weight: WeightFormValues) => requests.post<void>('/weight',weight),
    delete: (id:string) => requests.del<void>(`/weight/${id}`),
    list: () => requests.get<Weight[]>('/weight'),
}

const Account = {
    current: () => requests.get<User>('/account'),
    login: (user: UserFormValues) => requests.post<User>('/account/login',user),
    register: (user: UserFormValues) => requests.post<User>('/account/register',user)
}



const agent = {
    Account,
    DietGoals,
    Foods,
    Meals,
    WeightIns
}

export default agent;