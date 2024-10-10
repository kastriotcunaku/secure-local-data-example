import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { useEffect, useState } from "react";
import { LOCAL_STORAGE } from "@/lib/services";

const formSchema = z.object({
  password: z.string(),
});

type SignInProps = { onSuccess: () => void, onFailure: () => void };

const SignIn = (props: SignInProps) => {
  const [name, setName] = useState('');

  useEffect(() => {
    setName(localStorage.getItem('name') ?? '');
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const name = localStorage.getItem('name') as string;
    const password = localStorage.getItem('password');
    const encryptedPassword = LOCAL_STORAGE.encryptPassword(values.password, name);
    if (encryptedPassword !== password) {
      form.setError('password', { message: 'Incorrect password' });
      return;
    }
    LOCAL_STORAGE.setEncryptionIV(password + name);
    props.onSuccess();
  }

  function onLogout() {
    LOCAL_STORAGE.removeData();
    props.onFailure();
  }

  return (
    <div className="max-w-xl w-full">
      <Card>
        <CardHeader>
          <CardTitle>Welcome back, {name}</CardTitle>
          <CardDescription>
            Enter your password to unlock your notes
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

              <Button type="submit">Unlock</Button>
            </form>
          </FormProvider>
        </CardContent>
        <CardFooter className="text-zinc-500 md:flex-row flex-col">
          <span>Forgot your password?</span> <a className="link ml-1 text-zinc-600 hover:text-primary hover:cursor-pointer hover:underline" onClick={() => onLogout()}>Erase your data and start over</a>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignIn;
