import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import CryptoJS from 'crypto-js';
import { LOCAL_STORAGE } from "@/lib/services";

const passwordSchema = z
  .string()
  .min(8, { message: 'Password length should be more than 6 characters' })
  .max(20, { message: 'Password length should be less then 20 characters' })
  .refine((password) => /[A-Z]/.test(password), {
    message: 'Password should contain at least one uppercase letter',
  })
  .refine((password) => /[a-z]/.test(password), {
    message: 'Password should contain at least one lowercase letter',
  });

const formSchema = z.object({
  name: z.string().min(2).max(50),
  password: passwordSchema,
  confirmPassword: z.string(),
})
.refine((data) => data.password === data.confirmPassword, {
  message: 'Confirm password should match password',
  path: ['confirmPassword'],
});

type SignUpProps = { onSuccess: () => void };

const SignUp = (props: SignUpProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      password: '',
      confirmPassword: '',
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    localStorage.setItem('name', values.name);
    const encryptedPassword = CryptoJS.SHA1(values.password + values.name).toString();
    localStorage.setItem('password', encryptedPassword);
    LOCAL_STORAGE.setEncryptionIV(encryptedPassword);
    props.onSuccess();
  }

  return (
      <div className="max-w-xl w-full">
        <Card>
          <CardHeader>
            <CardTitle>Welcome</CardTitle>
            <CardDescription>
              Setup an account to store your notes securely
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <FormProvider {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Enter your password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Confirm your password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit">Start</Button>
              </form>
            </FormProvider>
          </CardContent>
        </Card>
      </div>
  );
};

export default SignUp;
