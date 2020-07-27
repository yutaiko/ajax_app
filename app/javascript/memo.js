function memo(){
  //送信ボタンのid=submitでDOM取得
  const submit = document.getElementById("submit");
  submit.addEventListener("click", (e) => {
    //フォームデータのオブジェクト生成と変数定義
    const formData = new FormData(document.getElementById("form"));
    //オブジェクト生成
    const XHR = new XMLHttpRequestEventTarget();
    //openメソッドでリクエストの内容設定
    XHR.open("POST", "/posts", true);
    //レスポンスの形式定義
    XHR.responseType = "json";
    //フォームデータ送信
    XHR.send(formData);
    //レスポンスを受け取った時の処理
    XHR.onload = () => {
      //itemにレスポンスとして返却されたメモのレコードデータを取得
      const item = XHR.response.post;
      //HTMLを描画する場所を指定する際に使用する「描画する親要素」のlistの要素を取得
      const list = document.getElementById("list");
      //「メモの入力フォーム」をリセットするために、formTextを取得する
      const formText = document.getElementById("content");
      //メモとして描画する部分のHTMLを定義
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;
      //listの要素"直後"に変数HTMLを追加する記述
      list.insertAdjacentHTML("afterend", HTML);
      //「メモの入力フォームに入力されたままの文字」に空の文字列を上書きしてリセット
      formText.value = "";
      //エラー発生時の記述
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
      } else {
        return null;
      }
    };
    //レスポンスが失敗した場合の処理の記述
    XHR.onerror = function () {
      alert("Request failed");
    };

    e.preventDefault();

  })
}
window.addEventListener("load", memo)