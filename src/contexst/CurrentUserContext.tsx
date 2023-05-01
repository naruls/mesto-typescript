import React from "react";
import { InterfaceUser } from "../types/types";


export const CurrentUserContext = React.createContext<InterfaceUser|undefined>({
    name: 'Конфуций',
    about: 'Китайский мыслитель',
    avatar: 'http://www.artmural.fr/wp-content/uploads/2010/10/CONFUSIUS1.jpg',
    cohort: 'cohort-25',
    _id: '',
  });;