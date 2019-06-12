import React, { Component } from 'react'
import api from '../services/api'
import io from 'socket.io-client'

import './Feed.css'

import more from '../assets/more.svg'
import like from '../assets/like.svg'
import comment from '../assets/comment.svg'
import send from '../assets/send.svg'

class Feed extends Component {
    state = {
        feed: [],
    }

    async componentDidMount() {
        this.registerToSocket()
        const response = await api.get('posts')

        this.setState({ feed: response.data })
    }

    handleLike = id => {
        api.post(`/posts/${id}/like`)
    }

    registerToSocket = () => {
        const socket = io('http://localhost:3333')

        // post, like

        socket.on('post', newPost => {
            // cria um novo array feed colocando o novo post (newPost)
            // no inicio, seguido do restante do feed usando spread operator
            this.setState({ feed: [newPost, ...this.state.feed ] })
        })

        socket.on('like', likedPost => {
            this.setState({
                // itera todos os posts do feed...
                feed: this.state.feed.map(post => 
                    //.. se o post do feed for igual ao novo post
                    // carrega o novo post, senão mantem o atual
                    post._id === likedPost._id ? likedPost: post
                )
            })
        })
    }

    render() {
        return (
            <section id="post-list">
                { this.state.feed.map(post => (
                    <article key={post._id}>
                        <header>
                            <div className="user-info">
                                <span>{post.author}</span>
                                <span className="place">{post.place}</span>
                            </div>

                            <img src={more} alt="Mais" />
                        </header>

                        <img src={`http://localhost:3333/files/${post.image}`} alt="" />

                        <footer>
                            <div className="actions">
                                <button type="button" onClick={() => this.handleLike(post._id)}>
                                    <img src={like} alt="" />    
                                </button>
                                
                                <img src={comment} alt="" />
                                <img src={send} alt="" />
                            </div>

                            <strong>{post.likes}</strong>

                            <p>
                                {post.description}
                                <span>{post.hashtags}</span>
                            </p>
                        </footer>
                    </article>
                 ) ) }
            </section>
        )
    }
}

export default Feed