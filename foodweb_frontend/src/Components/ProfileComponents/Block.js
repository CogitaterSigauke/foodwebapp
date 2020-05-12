import React, { Component } from 'react'
import './Block.css';
class Block extends Component {

    state = {
        users: [{ name: 'User_1' }, { name: 'User_2' }, { name: 'User_3' }],
        blocked: ['User_2', 'User_3']
    }

    User = (name) => {

        const check = true;
        return <div style={{ display: 'flex' }}>
            <p>{name}</p>
            {check ? <div> <button class="block">Block</button></div> : <div><button class="Unblock">Unblock</button></div>}
        </div>
    }

    SearchBar = () => {
        return <input type="text" id="fname" name="fname" />
    }

    Button = () => {
        return <button></button>
    }

    render() {

        // [{ name: 'User_1' }, { name: 'User_2' }, { name: 'User_3' }]
        const { users } = this.state

        return (
            <div>
                {/* 이게 해더 */}
                <div>
                    <div class="Box1" /><img src="http://www.w3.org/1999/xlink" alt="image"></img>
                    <button class="button1" type="button">Add recipe</button>
                    <button class="button2" type="button">Log Out</button>
                </div>
                {/* 이게 바디  */}
                <div style={{ display: 'flex' }}>
                    {/* 이게 사이드바 */}
                    <div style={{ background: 'white' }}>
                        <div><img src="http://www.w3.org/1999/xlink" alt="image"></img></div>
                        <div><button class="Box" type="button">About Me</button></div>
                        <div><button class="Box" type="button">My Favorites</button></div>
                        <div><button class="Box" type="button">My Recipes</button></div>
                        <div><button class="Box2" type="button">Setting</button></div>
                    </div>
                    {/* 이게 진짜바디  */}
                    <div class="parent">
                        {/* <input class="search__input" type="text" placeholder="Search"> */}
                        <this.SearchBar /> <button class="button">Search</button>
                        {users.map(e => this.User(e.name))}
                    </div>
                </div>


                {/* 이게 테일 */}
                <div>
                    <button class="button5 button3">Contact Us</button>
                </div>
            </div >
        )
    }
}


export default Block