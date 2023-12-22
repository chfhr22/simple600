## npx react-create-app 오류

npm install -g yarn  
yarn create react-app .

## git 화살표 폴더

위 폴더중 최상위 디렉토리에 이미 .git이라는 파일이 생성되었는데, 해당 디렉토리에서도 push를 진행하는 과정에 .git 파일이 생겨서 발생하는 오류로

```
rm -rf .git
git rm --cached . -rf
```

해당 폴더에 들어가서 명령어를 입력하면 git폴더와 캐쉬가 지워져서 정상적으로 돌아온다.

## client

npx create-react-app .  
npm install sass  
npm install react-bootstrap bootstrap  
npm install react-router-dom  
npm install axios  
npm install http-proxy-middleware  
npm install @emotion/css  
npm install @emotion/react  
npm install @emotion/styled  
npm install firebase  
npm install react-redux  
npm install @reduxjs/toolkit
npm install react-avatar
npm install moment

## server

npm init -y;  
npm install express --save;  
npm install nodemon --save;  
npm install path --save;  
npm install mongoose --save;  
npm install multer --save;  
npm install aws-sdk@2.348.0 --save;  
npm install multer-s3@2.10.0 --save;

<!-- multer-s3는 2.10.0 버전을 설치해야 함 -->

## 제작과정

```js
//index.js
const express = require("express");
const app = express();
const port = 5050;

// 서버를 해당 포트에서 실행
app.listen(port, () => {
  console.log("running --> " + port);
});

app.get("/", (req, res) => {
  res.send("Hello World");
});
```

- express 설치과정

const express = require("express") -- 호출

const port = 5050; -- 포트번호 설정

// 서버를 해당 포트에서 실행
app.listen(port, () => {
console.log("running --> " + port)
})

// 루트 경로에 대한 GET 요청에 대한 핸들러를 정의
app.get("/", (req, res) => {
res.send("Hello World")
})

## server와 client의 파일을 연결

```js
// index.js
const path = require("path");

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});
```

client에서 npm run build를 한 후 server에서 path를 사용하여 client에 접근할 수 있다.  
app.use는 정적파일을 제공하며, app.get은 url에 대한 응답을 설정한 것이다.

## mongoDB연결

mongoDB 사이트에서 데이터베이스를 만든 후 데이터베이스에 들어가서 connect -> drivers  
mongodb+srv://chfhrdk:password@cluster0.lcqe0nz.mongodb.net/?retryWrites=true&w=majority  
password부분에 설정한 비밀번호 입력

## mongoose 연결 (mongoDB 플러그인)

const mongoose = require('mongoose');
mongoose.connect('');  
connect괄호에 'ongodb+srv://chfhrdk:password@cluster0.lcqe0nz.mongodb.net/?retryWrites=true&w=majority' 입력

```js
// index.js
const mongoose = require("mongoose");

app.listen(port, () => {
  mongoose
    .connect(
      "mongodb+srv://chfhrdk:chfhrdk@cluster0.lcqe0nz.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(() => {
      console.log("listening -->" + port);
      console.log("connect --> mongoDB...");
    });
});
```

## CORS에러

Cross-Origin Resource Sharing의 줄임말로, 한국어로는 교차-출처 리소스 공유라고 한다. 교차 출처가 무엇이냐, 쉽게 말해 다른 출처라고 말할 수 있다.
출처는 Protocol, Host, 포트번호를 의미한다. 즉 서버의 위치를 찾아가기 위해 필요한 가장 기본적인 것들을 합쳐놓은 것이다.

port와 port간 전송을 할 때 http는 상관없지만 https는 보안상 문제때문에 암호화 되서 전달되므로

### 해결방법

미들웨어 사용하여 바로 가는것이 아닌 미들웨어를 한번 거쳐 확인 후 보내면 오류가 사라짐

```js
// setupProxy.js (index.js와 같은 위치에 있어야함)
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:5050",
      changeOrigin: true,
    })
  );
};
```

## DB에서 server로 데이터 받기

```js
// List.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const List = () => {
  const [text, setText] = useState("");

  useEffect(() => {
    axios
      .post("/api/test")
      .then(function (response) {
        alert("요청성공");
        console.log(response);
        setText(response.data.text);
      })
      .catch(function (error) {
        alert("요청실패");
        console.log(error);
      });
  }, []);
  return (
    <div>
      List
      <p>서버에서 받은 데이터 : {text}</p>
    </div>
  );
};

export default List;
```

## server에서 받은 데이터 client로 보내기

```js
// List.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const List = () => {
  const [text, setText] = useState("");

  useEffect(() => {
    let body = {
      text: "다시 보냄",
    };
    axios
      .post("/api/test", body)
      .then((response) => {
        setText(response.data.text);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h3>{text}</h3>
    </div>
  );
};

export default List;
```

이렇게만하면 undefined가 뜨는데
express의 body-parser를 써서 본문을 해석해야 처리가능

```js
// index.js
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
```

## mongoDB에 데이터 넣기 (스키마 만들기 Model)

```js
// Post.js
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Post = mongoose.model("Post", postSchema);

module.exports = { Post };
```

```js
// Post.js를 index.js에 연동
const { Post } = require("./Model/Post.js");

app.post("/api/test", (req, res) => {
  const BlogPost = new Post({ title: "테스트", content: "테스트입니다." });
  BlogPost.save().then(() => {
    res.status(200).json({ success: true });
  });
});
```

## input의 내용을 스키마에 넣기

```js
// Upload.js
const [title, setTitle] = useState("");
const [content, setContent] = useState("");

const onSubmit = (e) => {
  e.preventDefault();

  if (title === "" || content === "") {
    return alert("제목 또는 내용을 적어주세요");
  }

  let body = {
    title: title,
    content: content,
  };
  axios.post("/api/post/submit", body).then((Response) => {
    if (Response.data.success) {
      alert("글 작성이 완료되었습니다.");
    } else {
      alert("글 작성을 실패했습니다.");
    }
  });
};
```

```js
// index.js
app.post("/api/post/submit", (req, res) => {
  let temp = req.body;
  console.log(temp);

  const BlogPost = new Post(temp);
  BlogPost.save().then(() => {
    res.status(200).json({ success: true });
  });
});
```

## 스키마에 있는 테이터 list에 보여주기

```js
// List.js
const List = () => {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    axios
      .post("/api/post/list")
      .then((response) => {
        if (response.data.success) {
          setPostList([...response.data.postList]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h3>글 목록</h3>
      {postList.map((post, key) => (
        <div key={key}>
          <h3>제목 : {post.title}</h3>
          <p>내용 : {post.content}</p>
        </div>
      ))}
    </div>
  );
};
```

```js
// index.js
app.post("/api/post/list", (req, res) => {
  Post.find()
    .exec()
    .then((doc) => {
      res.status(200).json({ success: true, postList: doc });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false });
    });
});
```

## 게시물에 ID값 만들어주기(게시글 수정,삭제를 위한 준비단계)

```js
// Conunter.js
const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema(
  {
    name: String,
    postNum: Number,
  },
  { collection: "counter" }
);

const Counter = mongoose.model("Counter", counterSchema);

module.exports = { Counter };
```

```js
// Post.js
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    postNum: Number,
  },
  { collection: "posts" }
);

const Post = mongoose.model("Post", postSchema);

module.exports = { Post };
```

```js
// index.js
app.post("/api/post/submit", (req, res) => {
  let temp = req.body;
  // 넘버 추가 작업
  Counter.findOne({ name: "counter" })
    .exec()
    .then((counter) => {
      temp.postNum = counter.postNum;

      const BlogPost = new Post(temp);

      BlogPost.save().then(() => {
        // 번호를 1씩증가
        Counter.updateOne({ name: "counter" }, { $inc: { postNum: 1 } }).then(
          () => {
            res.status(200).json({ success: true });
          }
        );
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false });
    });
});
```

## 상세페이지로 이동작업

```js
return (
  <div>
    <h3>글 목록</h3>
    {postList.map((post, key) => (
      <div key={key}>
        <h3>제목 : {post.title}</h3>
        <p>내용 : {post.content}</p>
        <Link to={`/post/${post.postNum}`}>내용 보기</Link>
      </div>
    ))}
  </div>
);
```

```js
// App.js
// post뒤에 postNum이 붙으면 detail페이지로 이동
<Route path="/post/:postNum" element={<Detail />} />
```

```js
//detail.js
// 상세페이지
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Detail = () => {
  let params = useParams();
  const [postInfo, setPostInfo] = useState({});

  useEffect(() => {
    let body = {
      postNum: params.postNum,
    };

    axios
      .post("/api/post/detail", body)
      .then((response) => {
        console.log(response);
        setPostInfo(response.data.post);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <div>
        <h3>제목 : {postInfo.title}</h3>
        <p>내용 : {postInfo.content}</p>
      </div>
    </div>
  );
};

export default Detail;
```

## 수정하기

```js
// edit.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Edit = () => {
  let params = useParams();
  let navigate = useNavigate();

  const [postInfo, setPostInfo] = useState({});
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  useEffect(() => {
    let body = {
      postNum: params.postNum,
    };

    axios
      .post("/api/post/detail", body)
      .then((response) => {
        if (response.data.success) {
          setPostInfo(response.data.post);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.postNum]);

  useEffect(() => {
    setTitle(postInfo.title);
    setContents(postInfo.content);
  }, [postInfo]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (title === "" || contents === "") {
      return alert("모든 항목을 채워주세요");
    }

    let body = {
      title: title,
      content: contents,
      postNum: params.postNum,
    };

    axios
      .post("/api/post/edit", body)
      .then((response) => {
        if (response.data.success) {
          alert("글 수정 완료");
          navigate(`/post/${params.postNum}`);
        } else {
          alert("글 수정 실패");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div style={{ padding: "20px" }}>
      <form>
        <label htmlFor="title">제목</label>
        <input
          id="title"
          type="text"
          value={title || ""}
          onChange={(event) => {
            setTitle(event.currentTarget.value);
          }}
        />
        <br />
        <label htmlFor="contents">내용</label>
        <textarea
          id="contents"
          value={contents || ""}
          onChange={(event) => {
            setTitle(event.currentTarget.value);
          }}
        ></textarea>

        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            취소
          </button>
          <button
            onClick={(e) => {
              onSubmit(e);
            }}
          >
            제출
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
```

```js
// index.js
app.post("/api/post/edit", (req, res) => {
  let temp = {
    title: req.body.title,
    content: req.body.content,
  };
  Post.updateOne({ postNum: Number(req.body.postNum) }, { $set: temp })
    .exec()
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false });
    });
});
```

## 삭제하기

```js
// detail.js
const DeleteHandler = () => {
  if (window.confirm("정말로 삭제하시겠습니까?")) {
    let body = {
      postNum: params.postNum,
    };
    axios
      .post("/api/post/delete", body)
      .then((response) => {
        if (response.data.success) {
          alert("게시글이 삭제되었습니다.");
          navigate("/list"); // 페이지 이동을 위해 navigate 함수를 사용합니다.
        }
      })
      .catch((err) => {
        console.log(err);
        alert("게시글 삭제가 실패했습니다.");
      });
  }
};
```

```js
//index.js
app.post("/api/post/delete", (req, res) => {
  Post.deleteOne({ postNum: Number(req.body.postNum) })
    .exec()
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch(() => {
      res.status(400).json({ success: false });
    });
});
```

## index.js를 express router 이용하여 정리

```js
// post.js
let express = require("express");
let router = express.Router();

const { Post } = require("../Model/Post.js");
const { Counter } = require("../Model/Counter.js");

router.post("/submit", (req, res) => {
  let temp = req.body;
  const BlogPost = new Post(temp);

  Counter.findOne({ name: "counter" })
    .exec()
    .then((counter) => {
      temp.postNum = counter.postNum;

      const BlogPosts = new Post(temp);
      BlogPosts.save().then(() => {
        Counter.updateOne({ name: "counter" }, { $inc: { postNum: 1 } }).then(
          () => {
            res.status(200).json({ success: true });
          }
        );
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false });
    });
});

router.post("/list", (req, res) => {
  Post.find()
    .exec()
    .then((doc) => {
      res.status(200).json({ success: true, postList: doc });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false });
    });
});

router.post("/detail", (req, res) => {
  Post.findOne({ postNum: req.body.postNum })
    .exec()
    .then((doc) => {
      console.log(doc);
      res.status(200).json({ success: true, post: doc });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false });
    });
});

router.post("/delete", (req, res) => {
  Post.deleteOne({ postNum: Number(req.body.postNum) })
    .exec()
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false });
    });
});

router.post("/edit", (req, res) => {
  let temp = {
    title: req.body.title,
    content: req.body.content,
  };
  Post.updateOne({ postNum: Number(req.body.postNum) }, { $set: temp })
    .exec()
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false });
    });
});

module.exports = router;
```

```js
// index.js
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
const port = 5050;

app.use(express.static(path.join(__dirname, "../client/build")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/post", require("./Router/post.js"));

app.listen(port, () => {
  mongoose
    .connect(
      "mongodb+srv://chfhrdk:chfhrdk@cluster0.lcqe0nz.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(() => {
      console.log("listening -->" + port);
      console.log("connect --> mongoDB...");
    });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});
```

## 게시글 이미지 업로드

```js
// ImgUplaod.js
import React from "react";
import { Form } from "react-bootstrap";
import axios from "axios";

const ImgUpload = (props) => {
  const FileUpload = (e) => {
    // console.log(e.target.files)
    let formData = new FormData();
    formData.append("file", e.target.files[0]);
    // for(const ketValue of formData){
    //     console.log(ketValue)
    // }

    axios.post("/api/post/img/upload", formData).then((response) => {
      props.setImage(response.data.filePath);
    });
  };
  return (
    <div>
      <Form.Control
        type="file"
        accept="image/*"
        onChange={(e) => FileUpload(e)}
      />
    </div>
  );
};

export default ImgUpload;
```

이미지를 올리려면 multer가 필요함
[multer](https://github.com/expressjs/multer/blob/master/doc/README-ko.md)

```js
// post.js
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "img/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage }).single("file");

router.post("/img/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(400).json({ success: false });
    } else {
      res.status(200).json({ success: true, filePath: res.req.file.path });
    }
  });
});
```

```js
// Post.js
// 스키마 추가
image: String;
```

```js
//index.js
// 이미지 사용 선언
app.use("/img", express.static("./img"));
```

```js
//detail.js
<img
  src={`http://localhost:5050/${postInfo.image}`}
  alt="이미지"
  style={{ width: "100%" }}
/>
```

## 회원가입

## 로그인관련 firebase연동

client에 firebase 파일 만든 후 firebase에서 소스 가져오기

< Join.jsx>

```js
import React, { useState } from "react";

import firebase from "../../firebase.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Join = () => {
  const [youName, setYouName] = useState("");
  const [youEmail, setYouEmail] = useState("");
  const [youPass, setYouPass] = useState("");
  const [youPassC, setYouPassC] = useState("");

  let navigate = useNavigate();

  const JoinFunc = async (e) => {
    e.preventDefault();
    if (!(youName && youEmail && youPass && youPassC)) {
      return alert("모든 항목을 채워주세요");
    }
    if (youPass !== youPassC) {
      return alert("비밀번호가 일치하지 않습니다.");
    }

    // 개인정보 -> firebase로 주기
    let createdUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(youEmail, youPass);

    await createdUser.user.updateProfile({
      displayName: youName,
    });

    console.log(createdUser.user);

    // 개인정보 -> mongoDB로 주기

    let body = {
      email: createdUser.user.multiFactor.user.email,
      displayName: createdUser.user.multiFactor.user.displayName,
      uid: createdUser.user.multiFactor.user.uid
    }
    axios.post("/api/user/join", body)
    .then((response) => {
      if(response.data.success){
        alert("회원가입 성공")
        navigate("/login")
      } else {
        return alert("회원가입 실패")
      }
  });
};
```

```js
// router/user.js
// mongDb로 회원정보 넣기
const express = require("express");
const router = express.Router();

// 스키마 만들기
const { User } = require("../Model/User.js");
const { Counter } = require("../Model/Counter.js");

router.post("/join", (req, res) => {
  let temp = req.body;

  Counter.findOne({ name: "counter" })
    .then((result) => {
      temp.userNum = result.userNum;

      const userData = new User(req.body);
      userData.save().then(() => {
        Counter.updateOne({ name: "counter" }, { $inc: { userNum: 1 } }).then(
          () => {
            res.status(200).json({ success: true });
          }
        );
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false });
    });
});

module.exports = router;
```

## count

```js
<button
  onClick={() => {
    let arr = [];
    arr = [...temp];
    arr.push(arr.length + 1);
    setTemp([...arr]);
  }}
>
  버튼
</button>
```
