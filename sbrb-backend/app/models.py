import datetime
from enum import Enum as PyEnum

from app.database import Base
from sqlalchemy import Column, DateTime, Enum, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship


class Role(Base):
    __tablename__ = "role"
    role_name = Column("rname", String(20), primary_key=True)
    role_desc = Column("description", Text)

    skills = relationship(
        "Skill", secondary="role_skill", back_populates="roles", cascade="all, delete"
    )
    staff = relationship("Staff", back_populates="role", cascade="all, delete")
    listing = relationship("Listing", back_populates="role", cascade="all, delete")


class Skill(Base):
    __tablename__ = "skill"
    skill_name = Column("sname", String(50), primary_key=True)
    skill_desc = Column("description", Text)

    roles = relationship(
        "Role", secondary="role_skill", back_populates="skills", cascade="all, delete"
    )
    staff = relationship("Staff", secondary="staff_skill", back_populates="skills")


class RoleSkill(Base):
    __tablename__ = "role_skill"
    role_name = Column(
        "role_name",
        String(20),
        ForeignKey("role.rname", ondelete="CASCADE", onupdate="CASCADE"),
        primary_key=True,
    )
    skill_name = Column(
        "skill_name",
        String(50),
        ForeignKey("skill.sname", ondelete="CASCADE", onupdate="CASCADE"),
        primary_key=True,
    )


class AccessControl(Base):
    __tablename__ = "access_control"
    access_id = Column("ac_id", Integer, primary_key=True)
    access_control_name = Column("ac_name", String(20))

    staff = relationship("Staff", back_populates="access_control")


class Staff(Base):
    __tablename__ = "staff"
    staff_id = Column("staff_id", Integer, primary_key=True)
    staff_fname = Column("staff_fname", String(50), nullable=False)
    staff_lname = Column("staff_lname", String(50), nullable=False)
    dept = Column("dept", String(50), nullable=False)
    country = Column("country", String(50), nullable=False)
    email = Column("email", String(50), nullable=False)
    role_name = Column("rname", ForeignKey("role.rname"), nullable=True)
    access_id = Column(
        "ac_id", Integer, ForeignKey("access_control.ac_id"), nullable=False
    )

    role = relationship("Role", back_populates="staff")
    access_control = relationship("AccessControl", back_populates="staff")
    applications = relationship("Application", back_populates="submitted_by")
    skills = relationship("Skill", secondary="staff_skill", back_populates="staff")


class StaffSkill(Base):
    __tablename__ = "staff_skill"
    staff_id = Column(
        "staff_id",
        Integer,
        ForeignKey("staff.staff_id", ondelete="CASCADE", onupdate="CASCADE"),
        primary_key=True,
    )
    skill_name = Column(
        "skill_name",
        String(50),
        ForeignKey("skill.sname", ondelete="CASCADE", onupdate="CASCADE"),
        primary_key=True,
    )


class Listing(Base):
    __tablename__ = "listing"
    listing_id = Column("listing_id", Integer, primary_key=True)
    role_name = Column("rname", ForeignKey("role.rname"), nullable=False)
    listing_title = Column("title", String(50))
    listing_desc = Column("description", String(50))
    dept = Column("dept", String(50), nullable=False)
    country = Column("country", String(50), nullable=False)
    reporting_manager_id = Column(
        "reporting_manager_id", Integer, ForeignKey("staff.staff_id"), nullable=False
    )
    created_date = Column("created_date", DateTime, default=datetime.datetime.utcnow)
    expiry_date = Column("expiry_date", DateTime)

    created_by = Column(
        "created_by",
        Integer,
        ForeignKey("staff.staff_id", ondelete="CASCADE", onupdate="CASCADE"),
    )

    role = relationship("Role", back_populates="listing")
    reporting_manager = relationship("Staff", foreign_keys=[reporting_manager_id])
    applications = relationship("Application", back_populates="listing")


class ApplicationStatusEnum(PyEnum):
    PENDING = "Pending"
    APPROVED = "Approved"
    REJECTED = "Rejected"


class Application(Base):
    __tablename__ = "application"
    application_id = Column("application_id", Integer, primary_key=True)
    submitted_by_id = Column(
        "submitted_by",
        Integer,
        ForeignKey("staff.staff_id", ondelete="CASCADE", onupdate="CASCADE"),
    )
    submission_date = Column(
        "submission_date", DateTime, default=datetime.datetime.utcnow
    )
    status = Column(
        "status", Enum(ApplicationStatusEnum), default=ApplicationStatusEnum.PENDING
    )

    listing_id = Column(
        "listing_id", Integer, ForeignKey("listing.listing_id"), nullable=False
    )

    listing = relationship("Listing", back_populates="applications")
    submitted_by = relationship("Staff", back_populates="applications")
