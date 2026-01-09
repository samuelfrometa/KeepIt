from passlib.context import CryptContext

pwd_context = CryptContext(
    schemes=["bcrypt_sha256"],
    deprecated="auto",
)

MAX_BCRYPT_LEN = 72


def _normalize_password(password: str) -> bytes:
    if isinstance(password, str):
        password = password.encode("utf-8")
    return password[:MAX_BCRYPT_LEN]


def hash_password(password: str) -> str:
    password_bytes = _normalize_password(password)
    return pwd_context.hash(password_bytes)


def verify_password(password: str, hashed: str) -> bool:
    password_bytes = _normalize_password(password)
    return pwd_context.verify(password_bytes, hashed)
