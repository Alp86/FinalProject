import * as io from 'socket.io-client';

import {
    chatMessages, chatMessage, usersOnline, userIsOnline, userIsOffline,
    receiveFriends, privateMessage, privateMessages, forumsDashboard
} from './actions';

export let socket;

export const init = store => {
    if (!socket) {
        socket = io.connect();

        socket.on(
            'chatMessages',
            msgs => {
                console.log("chatMessages received:", msgs);
                store.dispatch(
                    chatMessages(msgs)
                );
            }
        );

        socket.on(
            'chatMessage',
            msg => {
                console.log("new chatMessage received:", msg);
                store.dispatch(
                    chatMessage(msg)
                );
            }
        );

        socket.on(
            'usersOnline',
            users => {
                console.log("users online:", users);
                store.dispatch(
                    usersOnline(users)
                );
            }
        );

        socket.on(
            'userIsOnline',
            user => {
                // console.log("user is online");
                console.log(`${user.first} ${user.last} is online:`, user);
                store.dispatch(
                    userIsOnline(user)
                );
            }
        );

        socket.on(
            'userIsOffline',
            user => {
                console.log("user is offline:", user);
                store.dispatch(
                    userIsOffline(user)
                );
            }
        );

        socket.on(
            'friendRequestUpdate',
            () => {
                store.dispatch(
                    receiveFriends()
                );
            }
        );

        socket.on(
            'privateMessage',
            msg => {
                store.dispatch(
                    privateMessage(msg)
                );
            }
        );

        socket.on(
            'privateMessages',
            msgs => {
                store.dispatch(
                    privateMessages(msgs)
                );
            }
        );

        socket.on(
            'forumsDashboard',
            forumsObj => {
                store.dispatch(
                    forumsDashboard(forumsObj)
                );
            }
        );
    }
};
