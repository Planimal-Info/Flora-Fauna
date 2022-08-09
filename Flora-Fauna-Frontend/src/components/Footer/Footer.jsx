import { Grid, Text, Link, css } from "@nextui-org/react"
import "./Footer.css"

export default function Footer() {
    const FooterItem = ({ text }) => {
    return (
          <Text h6 size={15} color="white" css={{ m: 0 }}>
            {text}
          </Text>
    );
  };

  const MinorFooterItem = ({ text }) => {
    return (
          <Text size={13} color='white' css={{ m: 0 }} weight='light'>
            {text}
          </Text>
    );
  };


   return (
    <div className="f-footer">
        <Grid.Container gap={2} justify='center'>
          <Grid xs={3} justify='center' direction='column'>
        <FooterItem text="Developed by" />
        <MinorFooterItem text="Amaar Mohammed, Kevin Gomes and Valerie Michel" />
      </Grid>
      <Grid xs={6} justify='center' alignItems="flex-end">
        <MinorFooterItem text="© 2022 Flora and Fauna. All Rights reserved." />
      </Grid>
      <Grid xs={3} justify='center' direction='column'>
        <FooterItem text="Contact Us" />
        <MinorFooterItem text="admin@florafauna.org" />
        <Link className="socials" href='https://github.com/Planimal-Info/Flora-Fauna'>
            <i className="fa-brands fa-github"></i>
        </Link>
      </Grid>
        </Grid.Container>
   </div>
)
}
