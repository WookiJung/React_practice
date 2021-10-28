import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import { ChromeMessage, ChromeMessageResponse, Sender, getCurrentTabUId, getCurrentTabUrl, getBojId } from './types';
import './App.css'

const App = () => {
    const [url, setUrl] = useState('')
    const [responseFromContent, setResponseFromContent] = useState('')
    const [bojId, setBojId] = useState('')
    useEffect(() => {
        getCurrentTabUrl((url) => {
            setUrl(url || "undefined")
        })
        getBojInfo()
        addStatusTable()
    },[])

    const sendTestMessage = () => {
        const message: ChromeMessage = {
            from: Sender.React,
            message: "Hello from React",
        }

        getCurrentTabUId((id) => {
            id && chrome.tabs.sendMessage(
                id,
                message,
                (responseFromContentScript) => {
                    setResponseFromContent(responseFromContentScript);
                });
        });
    };

    const sendRemoveMessage = () => {
        const message: ChromeMessage = {
            from: Sender.React,
            message: "delete logo",
        }

        getCurrentTabUId((id) => {
            id && chrome.tabs.sendMessage(
                id,
                message,
                (response) => {
                    setResponseFromContent(response);
                });
        });
    };
    const getBojInfo = () => {
        const message: ChromeMessage = {
            from: Sender.React,
            message: "get boj info",
        }

        getCurrentTabUId((id) => {
            id && chrome.tabs.sendMessage(
                id,
                message,
                (response) => {
                    setBojId(response);
                });
        });
    }
    const addStatusTable = () => {
        const message: ChromeMessage = {
            from: Sender.React,
            message: "add status table",
        }

        getCurrentTabUId((id) => {
            id && chrome.tabs.sendMessage(
                id,
                message,
                (response) => {
                    setResponseFromContent(response);
                });
        });
    }
    return (
        <div className="App">
            
                <div>
                    <p>URL:</p>
                    <p>{url}</p>
                    <p>백준 ID:</p>
                    <p>{bojId}</p>
                </div>
                <button onClick={sendTestMessage}> Send Message from chrome</button>
                <button onClick={sendRemoveMessage}> Delete logo</button>
                <button onClick={getBojInfo}> getinfo</button>
                
                <p>Response from content:</p>
                <p>
                    {responseFromContent}
                </p>
        </div>
    );
};

export default App