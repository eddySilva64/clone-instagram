import React, { Component } from 'react';
import './Feed.css'
import More from '../assets/more.svg'
import Like from '../assets/like.svg'
import Comment from '../assets/comment.svg'
import Send from '../assets/send.svg'
import api from '../services/api'
 
class Feed extends Component {

    state = {
        feed: [],
    };

    async componentDidMount(){
        const response = await api.get('posts');
        this.setState({ feed: response.data });
    }

    render(){
        return(
            <section id="post-list">

                {this.state.feed.map(post => (

                <article>
                    <header>
                        <div className="user-info">
                            <span>{post.author}</span>
                            <span className="p">{post.place}</span>
                        </div>
                        <img src={More} alt="Mostrar Mais"/>
                    </header>

                    <img src={`http://localhost:3333/files/${post.image}`} alt=""/>

                    <footer>

                        <div className="actions">

                            <img src={Like} alt=""/>
                            <img src={Comment} alt=""/>
                            <img src={Send} alt=""/>

                        </div>

                        <strong>{post.likes} curtidas</strong>

                        <p>
                            {post.description}
                            <span>{post.hashtags}</span>
                        </p>
                    </footer>
                </article>
                ))}

            </section>
        )
    }
}

export default Feed;