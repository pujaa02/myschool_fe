export interface TrainerInitialRegister {
  profile_image: string | File;
  first_name: string;
  last_name: string;
  trainer_attachment?: string | File | (string | File)[] | null;
  location: string;

  sub_categories: string[] | number[];
  profile: boolean;
}
