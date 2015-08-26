MembershipRequest.create!([
  {requester_id: 5, requestee_id: 6, organization_id: 1},
  {requester_id: 5, requestee_id: 4, organization_id: 4},
  {requester_id: 5, requestee_id: 1, organization_id: 2},
  {requester_id: 5, requestee_id: 2, organization_id: 3},
  {requester_id: 5, requestee_id: 1, organization_id: 2},
  {requester_id: 5, requestee_id: 6, organization_id: 1},
  {requester_id: 5, requestee_id: 4, organization_id: 4},
  {requester_id: 5, requestee_id: 1, organization_id: 6}
])
Organization.create!([
  {title: "math"},
  {title: "physics"},
  {title: "philosophy"},
  {title: "machines"},
  {title: "history"},
  {title: "fun"}
])
OrganizationMembership.create!([
  {member_id: 1, organization_id: 2},
  {member_id: 6, organization_id: 1},
  {member_id: 4, organization_id: 4},
  {member_id: 1, organization_id: 6},
  {member_id: 2, organization_id: 5},
  {member_id: 2, organization_id: 3},
  {member_id: 5, organization_id: 3},
  {member_id: 5, organization_id: 2},
  {member_id: 5, organization_id: 6},
  {member_id: 5, organization_id: 4},
  {member_id: 5, organization_id: 4},
  {member_id: 5, organization_id: 1},
  {member_id: 5, organization_id: 1}
])
Project.create!([
  {title: "P != NP", description: "    No pressure", status: "it might take a while", progress: nil, due_date: nil, organization_id: 1, owner_id: 5},
  {title: "Set of All Sets", description: "    Prove whether such a things exists.", status: "Looking good", progress: nil, due_date: nil, organization_id: 1, owner_id: 5},
  {title: "Sizes of Infinity", description: "    Does infinity vary in size? What about the reals vs the rationals or the rationals vs the naturals", status: "", progress: nil, due_date: nil, organization_id: 1, owner_id: 5},
  {title: "Goldbach Conjecture", description: "    Prove it", status: "", progress: nil, due_date: nil, organization_id: 1, owner_id: 5},
  {title: "Spaghetti", description: "    Why does spaghetti almost always break into more than two pieces when bent?", status: "", progress: nil, due_date: nil, organization_id: 2, owner_id: 5},
  {title: "Matter to Energy", description: "    How can we convert matter to energy?", status: "", progress: nil, due_date: nil, organization_id: 2, owner_id: 5},
  {title: "Reverse Sprinkler", description: "    What happens when you reverse the flow on a rotating sprinkler? Does the rotation reverse?", status: "", progress: nil, due_date: nil, organization_id: 2, owner_id: 5},
  {title: "Mind", description: "    What are mental states? ", status: "", progress: nil, due_date: nil, organization_id: 3, owner_id: 5},
  {title: "Informative Identity", description: "    If \"a = b\" means that a and b are the SAME THING, how can the statement be informative? Shouldn't already know it if we know what a is?", status: "", progress: nil, due_date: nil, organization_id: 3, owner_id: 5},
  {title: "Unicorns", description: "    How does the sentence \"Unicorns don't exist\" have a meaning if 'unicorn' doesn't actually refer to anything?", status: "", progress: nil, due_date: nil, organization_id: 3, owner_id: 5},
  {title: "Deterministic Finite Automaton", description: "    make a simple machine that will define languages", status: "", progress: nil, due_date: nil, organization_id: 4, owner_id: 5},
  {title: "Pushdown Automaton", description: "    fancy-up DFA with a memory", status: "", progress: nil, due_date: nil, organization_id: 4, owner_id: 5},
  {title: "Turing Machine", description: "    Make a computer!", status: "Alan is carrying us", progress: nil, due_date: nil, organization_id: 4, owner_id: 5}
])
User.create!([
  {fname: "Richard", mname: "Phillips", lname: "Feynman", email: "wattafeynman@gmail.com", session_token: "xu24NxxGmQzCYASbXr_M1A", password_digest: "$2a$10$JZvnEj63Z6SF4VUrI5rIYOjT7i758XYOG3CuWUgFMXS4NpUNJzpRe", img_url: "http://res.cloudinary.com/dlyzaubjo/image/upload/c_scale,w_45/v1440489476/Richard_Feynman_Nobel_bhyzxq.jpg"},
  {fname: "Alan", mname: "Mathison", lname: "Turing", email: "aturing@gmail.com", session_token: "ye1v83xwlgGiSl3MI-opUA", password_digest: "$2a$10$rEX2fxIsJbSSRdeNwr29E.71YVu0cypg85nceSb8Qoa5XLSnF1Ta2", img_url: "http://res.cloudinary.com/dlyzaubjo/image/upload/c_scale,w_50/v1440489464/AlanTuring_afxv2l.jpg"},
  {fname: "Paul", mname: "", lname: "Erdos", email: "perdos@gmail.com", session_token: "6ZHkYrpBollIqo1KmKFftQ", password_digest: "$2a$10$d2/YNM7CI3YYAM2tFAhAh.OSdKyS40afSjdeG8BdhXxYLc/mf3xjy", img_url: "http://res.cloudinary.com/dlyzaubjo/image/upload/c_scale,w_50/v1440489461/about_erdos_ap3vmf.jpg"},
  {fname: "Austin", mname: "David", lname: "Young", email: "austin@austinmail.com", session_token: "aV1tAegh72EDD0ZtgHaxCg", password_digest: "$2a$10$cNW0BTHvJM8V80uDX4X8Iuj/BYrMrwxG8Y9tgjQiXOqLlBBTKVAKm", img_url: nil},
  {fname: "Robert", mname: "", lname: "Oppenheimer", email: "roppenheimer@gmail.com", session_token: "oKFDOhCnMgGs9-osKA8KuA", password_digest: "$2a$10$V60FuHA6ut1Pv08sTH/ugenhnnn8gbJoSiDhUpqJfOG6Qi.UB4QG2", img_url: nil},
  {fname: "Kurt", mname: "", lname: "Goedel", email: "kgoedel@gmail.com", session_token: "f7GBxU6L5IEBeCYs1JSDcQ", password_digest: "$2a$10$ZLkzGhh024C833GdouZXF.zbsRJjnFyIs.6NVBl7QrHfhSgCTMmom", img_url: "http://res.cloudinary.com/dlyzaubjo/image/upload/c_scale,w_45/v1440489473/kurt_godel_r9ukll.jpg"},
  {fname: "Henri", mname: "", lname: "Poincare", email: "hpoincare@gmail.com", session_token: "M9O8G-e5SntoCvPtUdzYqg", password_digest: "$2a$10$bXbrngQdAdxO3iycwaAlm..94M2a5iaDb86ynYiW1jynsduIt9SFi", img_url: "http://res.cloudinary.com/dlyzaubjo/image/upload/c_scale,w_50/v1440489470/Henri_Poincar%C3%A9-2_dnesuv.jpg"},
  {fname: "Georg", mname: "", lname: "Cantor", email: "gcantor@gmail.com", session_token: "hbIeUvIPulfPDayb9gdTmQ", password_digest: "$2a$10$ZvYIkphBF2u42mpCM8KH8O6baoYJ1zMZ236HKbFNeMhrAlsjeXklq", img_url: "http://res.cloudinary.com/dlyzaubjo/image/upload/c_scale,w_50/v1440489467/Georg_Cantor2_mwflna.jpg"},
  {fname: "Gottlob", mname: "", lname: "Frege", email: "gfrege@gmail.com", session_token: "EZ6Lkoc6RO9U2sQt8DhseA", password_digest: "$2a$10$NMoCodn5VZTMKoVmAMm2mePMOQdH9uAjnu2y4NyPXvbC7RzBWNd1e", img_url: "http://res.cloudinary.com/dlyzaubjo/image/upload/c_scale,w_50/v1440489444/220px-Young_frege_c1olqb.jpg"},
  {fname: "Wolf", mname: "", lname: "Johnson", email: "wolf@gmail.com", session_token: "ozYvIPfkKLgDJM8UZ0wrEw", password_digest: "$2a$10$loXtJc8jD6KKyREPUvPZQOPZhDClV/Q31WH3Rarq4yY84c/TTUFGS", img_url: "http://res.cloudinary.com/dlyzaubjo/image/upload/c_scale,w_50/v1440547188/Grey_Wolf_Face_xhe7wb.jpg"},
  {fname: "Spider", mname: "", lname: "Brown", email: "spider@gmail.com", session_token: "59Jp6s3ZgasBv3KkwXpAUg", password_digest: "$2a$10$maW.hHJwqOZnKlzhuAoSOOu1Vv6N.s83rKHO1ZnSyk/EbUF3RvDWa", img_url: "http://res.cloudinary.com/dlyzaubjo/image/upload/c_scale,w_50/v1440547181/spider_face_inf3y8.jpg"},
  {fname: "Fox", mname: "", lname: "Williams", email: "fox@gmail.com", session_token: "eG19FxCUgufZswAze4GaNw", password_digest: "$2a$10$QskMqRDBcPIEwe3MKuoNAek6jiUS9dFTmPHu9N47fKvG6KUamOX5S", img_url: "http://res.cloudinary.com/dlyzaubjo/image/upload/c_scale,w_50/v1440547178/fox_face_y5cloj.jpg"},
  {fname: "Elephant", mname: "", lname: "Davis", email: "elephant@gmail.com", session_token: "wcADnU81SGE-gbYxvE0UXQ", password_digest: "$2a$10$2lTJiMLAgXjR3/yVt5rjMOODIxEA7lWyr1w5ys1SQZxXjngv9w.xC", img_url: "http://res.cloudinary.com/dlyzaubjo/image/upload/c_scale,w_50/v1440547171/elephant_face_a2tncz.jpg"},
  {fname: "Alpaca", mname: "", lname: "Smith", email: "alpaca@gmail.com", session_token: "q1oHtgZgBIhMHidda0sy7w", password_digest: "$2a$10$QKFQ7hUSctHVTwcOqP7z3u8AKLeJmStSiWMK082NMDR0YGsoTIrCW", img_url: "http://res.cloudinary.com/dlyzaubjo/image/upload/c_scale,w_50/v1440547167/alpaca_face_h1r4um.jpg"},
  {fname: "Coyote", mname: "", lname: "Smith", email: "coyote@gmail.com", session_token: "OXJVyh-Tg-H9kTigYMKzaw", password_digest: "$2a$10$kYfGtV/3I3elxPcoXR2Ri.te65uViUDba27kFDC5nidbqiznPvKDq", img_url: "http://res.cloudinary.com/dlyzaubjo/image/upload/c_scale,w_50/v1440547163/coyote_face_xcwnrf.jpg"},
  {fname: "Bertrand", mname: "Arthur", lname: "Russell", email: "brussel@gmail.com", session_token: "bgTeplc2m356Yodc9UWYPw", password_digest: "$2a$10$VcdBG2JtcitNWx.cPU8.ZeiRFsC/fAfAidkijdOd926HRjUIsdmza", img_url: "http://res.cloudinary.com/dlyzaubjo/image/upload/c_scale,w_50/v1440489457/23351-004-4286D6B7_o87yxn.jpg"}
])
