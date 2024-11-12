const Watch = ({ fill, stroke }: { fill?: string; stroke?: string }) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={fill || stroke}>
      <path d="M12 0C18.636 0 24 5.376 24 12C24 18.636 18.636 24 12 24C5.376 24 0 18.636 0 12C0 5.376 5.376 0 12 0ZM11.58 5.916C11.088 5.916 10.68 6.312 10.68 6.816V12.876C10.68 13.188 10.848 13.476 11.124 13.644L15.828 16.452C15.972 16.536 16.128 16.584 16.296 16.584C16.596 16.584 16.896 16.428 17.064 16.14C17.316 15.72 17.184 15.168 16.752 14.904L12.48 12.36V6.816C12.48 6.312 12.072 5.916 11.58 5.916Z" />
    </svg>
  );
};

export default Watch;