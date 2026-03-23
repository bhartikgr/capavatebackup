import React from "react";
import { ThumbsUp, Share2, MessageCircle } from "lucide-react";

const posts = [
  {
    id: 1,
    name: "Aarav Mehta",
    role: "Angel Investor",
    status: "Fintech | Early Stage Backer",
    userimage:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    message:
      "Fintech startups solving real compliance and cross-border payment issues will dominate the next decade. Regulatory clarity is becoming an advantage, not a barrier.",
    posturl:
      "https://images.unsplash.com/photo-1651341050677-24dba59ce0fd?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    likes: 124,
    comments: 18,
    liked: false,
    followed: false,
  },
  {
    id: 2,
    name: "Riya Sharma",
    role: "VC Partner",
    status: "SaaS | B2B Growth",
    userimage:
      "https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    message:
      "SaaS founders who deeply understand customer churn metrics will outscale competitors. Retention is the new growth.",
    posturl:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    likes: 98,
    comments: 12,
    liked: false,
    followed: false,
  },
  {
    id: 3,
    name: "Kabir Singh",
    role: "Startup Mentor",
    status: "AI | Automation",
    userimage:
      "https://images.unsplash.com/photo-1726722886957-2ed42b15aaa3?q=80&w=596&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    message:
      "AI automation isn't replacing founders. It’s multiplying execution capacity. Learn to integrate it early.",
    posturl:
      "https://images.unsplash.com/photo-1716279083176-60af7a63cb03?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    likes: 210,
    comments: 32,
    liked: false,
    followed: false,
  },
  {
    id: 4,
    name: "Ananya Verma",
    role: "Growth Strategist",
    status: "D2C | Branding",
    userimage:
      "https://images.unsplash.com/photo-1762950351560-dcc58618d313?q=80&w=640&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    message:
      "Brand trust compounds over time. D2C startups focusing only on paid ads without community building will struggle long-term.",
    posturl:
      "https://images.unsplash.com/photo-1559526324-593bc073d938?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    likes: 76,
    comments: 9,
    liked: false,
    followed: false,
  },
];

export default function SocialPosts() {
  return (
    <>
      <div className="row g-4">
        {posts.map((post) => (
          <div className="col-md-4">
            <div key={post.id} className="post_deisgn  shadow-sm h-100">
              <div className="d-flex flex-column gap-3 h-100">
                <div className="d-flex align-items-center gap-3">
                  <div className="post-profile">
                    <img
                      src={post.userimage}
                      alt="profile"
                      className="w-100 h-100 object-fit-cover rounded-circle"
                    />
                  </div>
                  <div className="d-flex flex-column gap-1">
                    <h4>{post.name}</h4>
                    <h5>{post.role}</h5>
                    <h5>Status : ({post.status})</h5>
                  </div>
                </div>
                <p style={{ fontSize: "0.9rem", lineHeight: "1.6" }}>
                  {post.message.slice(0, 480)}
                </p>
                <div className="d-flex flex-column gap-3 mt-auto">
                  <div className="post-image">
                    <img
                      src={post.posturl}
                      alt="post"
                      className="w-100 h-100 object-fit-cover rounded"
                    />
                  </div>
                </div>

                <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 pt-2 border-top">
                  <div className="d-flex gap-3">
                    <button className="btn btn-link p-0 text-muted d-flex align-items-center gap-2">
                      <ThumbsUp size={20} strokeWidth={1.5} />{" "}
                      <p>{post.likes}</p>
                    </button>
                    <button className="btn btn-link p-0 text-muted d-flex align-items-center gap-2">
                      <MessageCircle size={20} strokeWidth={1.5} />{" "}
                      <p>{post.comments}</p>
                    </button>
                    <button className="btn btn-link p-0 text-muted d-flex align-items-center gap-2">
                      <Share2 size={20} strokeWidth={1.5} /> <p>{post.likes}</p>
                    </button>
                  </div>

                  <button
                    className="btn text-white px-3 py-2 rounded"
                    style={{ backgroundColor: "#ff3e43", fontSize: "0.8rem" }}
                  >
                    Follow {post.name}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
