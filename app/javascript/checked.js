function check (){
  const posts = document.getElementsByClassName("post");
  //HTMLcollectionを配列に変換
  postsA = Array.from(posts);
  //forEachで、各要素１つずつに対して『クリック』した際に動作するイベント駆動を設定
  postsA.forEach(function (post){
    //addeventlistenerが重複して追加されることを回避する記述
    if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.setAttribute("data-load", "true");

    post.addEventListener("click", (e) => {
    //発火するイベント内容
      //カスタムデータで情報取得
      const postId = post.getAttribute("data-id");
      //オブジェクトの生成
      const XHR = new XMLHttpRequest();
      //リクエストの指定（設定内容）
      XHR.open("GET", `/posts/${postId}`, true);
      //レスポンス情報の設定
      XHR.responseType = "json";
      //レスポンスを送信
      XHR.send();
      //レスポンスがあった場合の処理
      XHR.onload = () => {
        //checked_actionで返却されたJSONを代入
        const item = XHR.response.post;
        //もし既読されていたら
        if (item.checked === true){
          //属性値をtrueにする
          post.setAttribute("data-check", "true");
          //未読であれば
        } else if(item.checked === false){
          //属性ごと削除
          post.removeAttribute("data-check");
        }
        //エラー発生次のエラ〜メッセージ
        if (XHR.status != 200) {
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
        } else {
          return null;
        }
      }
      //リクエスト失敗時の記述
      XHR.onerror = () => {
        alert("Request failed");
      };

      e.preventDefault();

    });
  });
}
setInterval(check, 1000);