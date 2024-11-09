import { useNavigate, useParams } from "react-router-dom";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect, useState } from "react";
import EditIcon from "../assets/edit.svg";

export default function Article() {
  const { urlId } = useParams();
  const navigate = useNavigate();

  console.log("id: " + urlId);

  const [article, setArticle] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedArticle, setEditedArticle] = useState({
    title: "",
    author: "",
    description: "",
  });

  useEffect(() => {
    const ref = doc(db, "articles", urlId);
    getDoc(ref).then((snapshot) => {
      setArticle(snapshot.data());
      setEditedArticle(snapshot.data());
    });
  }, [urlId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedArticle((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const editArticle = () => {
    setIsEditing(true);
  };

  const saveArticle = async () => {
    const ref = doc(db, "articles", urlId);
    await updateDoc(ref, editedArticle);
    setArticle(editedArticle);
    setIsEditing(false);
  };

  return (
    <div>
      {!article && <p>No records found!</p>}
      {article && (
        <div key={article.id}>
          {isEditing ? (
            <div>
              <input
                type="text"
                name="title"
                value={editedArticle.title}
                onChange={handleChange}
              />
              <input
                type="text"
                name="author"
                value={editedArticle.author}
                onChange={handleChange}
              />
              <textarea
                name="description"
                value={editedArticle.description}
                onChange={handleChange}
              />
              <button onClick={saveArticle}>Save</button>
            </div>
          ) : (
            <div>
              <h2>{article.title}</h2>
              <p>By {article.author}</p>
              <p>{article.description}</p>
              <button onClick={editArticle}>Edit</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
