from sqlalchemy import Column, String, Text
from database import Base

class Role(Base):
    __tablename__ = "role"
    role_name = Column('rname', String(20), primary_key=True)
    role_desc = Column('description', Text)

    def __repr__(self) -> str:
        return f"Role(role_name={self.role_name!r}, role_desc={self.role_desc!r})"
    
