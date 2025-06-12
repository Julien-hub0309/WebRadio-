let likeCount = 0, dislikeCount = 0;

        document.getElementById("likeBtn").addEventListener("click", () => {
            likeCount++;
            document.getElementById("likeCount").innerText = likeCount;
        });

        document.getElementById("dislikeBtn").addEventListener("click", () => {
            dislikeCount++;
            document.getElementById("dislikeCount").innerText = dislikeCount;
        });

        // Gestion des commentaires
        document.getElementById("submitComment").addEventListener("click", () => {
            let commentInput = document.getElementById("commentInput").value;
            if (commentInput.trim() !== "") {
                let newComment = document.createElement("li");
                newComment.textContent = commentInput;
                document.getElementById("commentList").appendChild(newComment);
                document.getElementById("commentInput").value = ""; // Effacer le champ
            }
        });